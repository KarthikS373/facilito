// UTILS
import getFirebase from 'keys/firebase'
import { CollectionReference, DocumentData, Firestore } from '@firebase/firestore'

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
	const { collection, getFirestore } = await import('firebase/firestore')

	// DATABASE
	const firebaseApp = await getFirebase()
	const db = globalDB ?? getFirestore(firebaseApp)

	// COLECCIÓN
	return collection(db, colName)
}
