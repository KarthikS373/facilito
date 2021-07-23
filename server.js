// IMPORTS
const { https, logger } = require('firebase-functions')
const { default: next } = require('next')
const admin = require('firebase-admin')

// APP
admin.initializeApp({
	apiKey: 'AIzaSyAwWXWg7FaK8INgl47k9nkQE_mOvJLWdEc',
	authDomain: 'facilito-app.firebaseapp.com',
	databaseURL: 'https://facilito-app.firebaseio.com',
	projectId: 'facilito-app',
	storageBucket: 'facilito-app.appspot.com',
	messagingSenderId: '37962835039',
	appId: '1:37962835039:web:d297864eaf27e71fcf67ea',
	measurementId: 'G-KQKJ0S6GJB',
})

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
