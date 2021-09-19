// UTILS
import {
	collection,
	CollectionReference,
	DocumentData,
	Firestore,
	getFirestore,
} from 'firebase/firestore'
import getFirebase from 'keys/firebase'

// GLOBALES
let globalDB: Firestore | null = null

/**
 * Obtener colección
 * @param  {string} colName
 * @description Retorna la collection en firestore con el nombre
 */
export const getCollection = async (
	colName: string
): Promise<CollectionReference<DocumentData>> => {
	// DATABASE
	const firebaseApp = await getFirebase()
	const db = globalDB ?? getFirestore(firebaseApp)

	// COLECCIÓN
	return collection(db, colName)
}
