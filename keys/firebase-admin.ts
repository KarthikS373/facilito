import * as firebaseAdmin from 'firebase-admin'

// VARIABLES DE ENTORNO
const privateKey = process.env.PRIVATE_KEY
const clientEmail = process.env.CLIENT_EMAIL
const projectId = process.env.PROJECT_ID

// ERROR
if (!privateKey || !clientEmail || !projectId) {
	console.log(
		`Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
	)
}

// INICIAR APP
if (!firebaseAdmin.apps.length) {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({
			privateKey: privateKey,
			clientEmail,
			projectId,
		}),
		projectId,
		databaseURL: `https://${projectId}.firebaseio.com`,
	})
}

export { firebaseAdmin }
