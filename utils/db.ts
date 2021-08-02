// UTILS
import firebase from 'keys/firebase'

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
	// DATABASE
	const db = globalDB ?? (await firebase()).firestore()

	// COLECCIÓN
	return db.collection(colName)
}
