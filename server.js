/* eslint-disable @typescript-eslint/no-var-requires */
// IMPORTS
const { https, logger } = require('firebase-functions')
const { default: next } = require('next')
const admin = require('firebase-admin')

// APP
if (!admin.apps.length) admin.initializeApp()

// NEXT
const nextjsServer = next({
	dev: false,
	conf: { distDir: '.next' },
})

const nextjsHandle = nextjsServer.getRequestHandler()

// CLOUD FUNC
exports.nextServer = https.onRequest((req, res) => {
	// COOKIE
	const sessionCookie = req.cookies.__session || ''

	// VERIFICAR TOKEN
	let idToken = null
	if (sessionCookie?.length) idToken = await admin.auth().verifySessionCookie(sessionCookie, true)

	// REDIRECT
	const path = req.path
	// if (idToken) res.redirect(path === '/cuenta' ? '/formularios' : '')
	// else res.redirect(path !== '/cuenta' ? '/cuenta' : '')
	console.log(path, idToken)

	return nextjsServer
		.prepare()
		.then(() => nextjsHandle(req, res))
		.catch(logger.log)
})
