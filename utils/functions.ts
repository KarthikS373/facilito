// USAR FUNCIÓN CALLABLE
export const getCallable = async (name: string) => {
	// IMPORTAR
	const firebase = (await import('keys/firebase')).default
	await import('firebase/functions')
	const functions = firebase.functions()

	// RETORNAR
	return functions.httpsCallable(name)
}
