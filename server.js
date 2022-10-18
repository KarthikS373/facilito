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
exports.nextReleaseServer = https.onRequest(async (req, res) => {
	return nextjsServer
		.prepare()
		.then(() => nextjsHandle(req, res))
		.catch(logger.log)
})
