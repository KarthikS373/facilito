import getFirebase from 'keys/firebase'

/**
 * Obtener callable
 * @description Invoca una función callable desde cloud functions
 * @param  {string} name
 */
const getCallable = async (name: string) => {
	const { getFunctions, httpsCallable } = await import('firebase/functions')

	// IMPORTAR
	const firebaseApp = await getFirebase()
	const functions = getFunctions(firebaseApp)

	// RETORNAR
	return httpsCallable(functions, name)
}

export default getCallable
