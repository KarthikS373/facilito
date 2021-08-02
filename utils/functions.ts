import firebase from 'keys/firebase'

/**
 * Obtener callable
 * @description Invoca una funcion callable desde cloud functions
 * @param  {string} name
 */
const getCallable = async (name: string) => {
	// IMPORTAR
	const functions = (await firebase()).functions()

	// RETORNAR
	return functions.httpsCallable(name)
}

export default getCallable
