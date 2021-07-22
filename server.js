// IMPORTS
const { https, logger } = require('firebase-functions')
const { default: next } = require('next')
const admin = require('firebase-admin')

// APP
admin.initializeApp()

// NEXT
const nextjsServer = next({
	dev: false,
	conf: { distDir: '.next' },
})

const nextjsHandle = nextjsServer.getRequestHandler()

// CLOUD FUNC
exports.nextServer = https.onRequest((req, res) => {
	return nextjsServer
		.prepare()
		.then(() => nextjsHandle(req, res))
		.catch(logger.log)
})
