// LEER REFERENCIA
export const getRealtimeRef = async (id: string) => {
	// FIREBASE
	const firebase = (await import('keys/firebase')).default
	await import('firebase/database')

	// REFERENCIA
	const realtime = firebase.database()
	return realtime.ref(id)
}
