import { getFunctions, httpsCallable } from 'firebase/functions'
import getFirebase from 'keys/firebase'

/**
 * Obtener callable
 * @description Invoca una función callable desde cloud functions
 * @param  {string} name
 */
const getCallable = async (name: string) => {
	// IMPORTAR
	const firebaseApp = await getFirebase()
	const functions = getFunctions(firebaseApp)

	// RETORNAR
	return httpsCallable(functions, name)
}

export default getCallable
