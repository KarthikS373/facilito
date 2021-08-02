type firebase = typeof globalThis.firebase.default
let cached: Promise<firebase> | null = null
async function getFirebaseClient() {
	// DEFAULTS
	const { default: firebase } = await import('firebase/app')

	// PACKAGES
	await Promise.all([
		import('firebase/auth'),
		import('firebase/firestore'),
		import('firebase/database'),
		import('firebase/functions'),
		import('firebase/storage'),
	])

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
	if (firebase.apps.length === 0) firebase.initializeApp(config)
	return firebase
}

// OBTENER
const getFirebase = () => {
	if (cached || !process.browser) return cached
	cached = getFirebaseClient()
	return cached
}

export default getFirebase
