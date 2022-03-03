// UTILS
import getFirebase from 'keys/firebase'
import type { CollectionReference, DocumentData, Firestore } from '@firebase/firestore'

// GLOBALES
let globalDB: Firestore | null = null

/**
 * Obtener colección
 * @param  {string} colName
 * @returns {Promise<CollectionReference<DocumentData>>}
 */
export const getCollection = async (
	colName: string
): Promise<CollectionReference<DocumentData>> => {
	const { collection } = await import('firebase/firestore')

	// COLECCIÓN
	return collection(await getFirestore(), colName)
}

const getFirestore = async (): Promise<Firestore> => {
	const { getFirestore } = await import('firebase/firestore')

	// DATABASE
	const firebaseApp = await getFirebase()
	globalDB = globalDB ?? getFirestore(firebaseApp)
	return globalDB
}

export default getFirestore
