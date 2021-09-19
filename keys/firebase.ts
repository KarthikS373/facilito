// TIPOS
import { FirebaseApp } from '@firebase/app'
import firebase, { initializeApp } from 'firebase/app'

async function getFirebase() {
	// CONFIGURACIONES
	const config = {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
		measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
	}

	// INICIAR
	let firebaseApp: FirebaseApp | null = null

	if (!firebase || firebase.getApps().length === 0) firebaseApp = initializeApp(config)
	else firebaseApp = firebase.getApp()

	return firebaseApp
}

export default getFirebase
