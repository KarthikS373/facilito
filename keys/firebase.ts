import firebase from 'firebase/app'
import 'firebase/analytics'

// VERIFICAR MULTIPLES INSTANCIAS
if (firebase.apps.length === 0) {
	// INICIAR
	firebase.initializeApp({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
		measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
	})
}

export const analytics = firebase.analytics
export default firebase
