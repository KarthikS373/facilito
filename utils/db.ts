// GLOBALES
let globalDB: firebase.default.firestore.Firestore | null = null

/**
 * Obtener colección
 * @param  {string} colName
 * @description Retorna la collection en firestore con el nombre
 */
export const getCollection = async (
	colName: string
): Promise<
	firebase.default.firestore.CollectionReference<firebase.default.firestore.DocumentData>
> => {
	// FIREBASE
	const frb = await import('keys/firebase')
	await import('firebase/firestore')

	// DATABASE
	const db = globalDB === null ? frb.default.firestore() : globalDB

	// COLECCIÓN
	return db.collection(colName)
}
