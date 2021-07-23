// FIREBASE
import firebase from 'keys/firebase'
import 'firebase/firestore'

// GLOBALES
let globalDB: firebase.firestore.Firestore | null = null

/**
 * Obtener colección
 * @param  {string} colName
 * @description Retorna la collection en firestore con el nombre
 */
export const getCollection = async (
	colName: string
): Promise<firebase.firestore.CollectionReference<firebase.firestore.DocumentData>> => {
	// DATABASE
	const db = globalDB === null ? firebase.firestore() : globalDB

	// COLECCIÓN
	return db.collection(colName)
}
