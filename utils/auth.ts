// GLOBALES
let globalAuth: (() => firebase.default.auth.Auth) | null = null
let fbProvider: firebase.default.auth.FacebookAuthProvider | null = null
let gProvider: firebase.default.auth.GoogleAuthProvider | null = null

/**
 * Obtener Auth
 * @description Retorna la instancia global de firebase/auth
 */
export const getAuth = async () => {
	const firebase = await import('keys/firebase')
	await import('firebase/auth')

	// INSTANCIA
	if (globalAuth === null) {
		globalAuth = firebase.default.auth
		globalAuth().languageCode = 'es-GT'

		// PROVIDERS
		fbProvider = new firebase.default.auth.FacebookAuthProvider()
		gProvider = new firebase.default.auth.GoogleAuthProvider()
	}

	// LISTENER
	return globalAuth
}

/**
 * Iniciar anónimo
 * @description Inicia sesión como usuario anónimo
 */
export const signingAnonymously = async () => {
	const auth = await getAuth()
	return auth().signInAnonymously()
}
