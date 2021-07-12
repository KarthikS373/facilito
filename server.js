// FIREBASE
const { https } = require('firebase-functions')
const { default: next } = require('next')

// DEV OR PROD
const isDev = process.env.NODE_ENV !== 'production'

// NEXT CONFIG
const server = next({
	dev: isDev,
	conf: { distDir: '.next' },
})

// FUNCTION
const nextjsHandle = server.getRequestHandler()
exports.nextServer = https.onRequest((req, res) => {
	return server
		.prepare()
		.then(() =>
			nextjsHandle(req, res).catch((err) => {
				throw new Error(err)
			})
		)
		.catch((err) => {
			throw new Error(err)
		})
})
