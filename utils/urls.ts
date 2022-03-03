// DB
import { getCollection } from './db'

/**
 * Guardar nueva URL
 * @param  {boolean} alreadyFclt
 * @param  {string} fcltCode
 * @param  {FcltRequest} fcltRequest
 * @returns {Promise<void>}
 */
export const saveUrl = async (
	alreadyFclt: boolean,
	fcltCode: string,
	fcltRequest: FcltRequest
): Promise<void> => {
	// AGREGAR
	if (!alreadyFclt) {
		const { setDoc, doc } = await import('firebase/firestore')

		// COLECCION
		const col = await getCollection('urls')
		const urlDoc = doc(col, fcltCode)

		// AGREGAR
		return setDoc(urlDoc, fcltRequest)
	}
}

/**
 * Validar url
 * @param  {string} url
 * @returns {Promise<boolean>}
 */
export const validateURL = async (url: string): Promise<boolean> => {
	const { doc, getDoc } = await import('firebase/firestore')

	const col = await getCollection('urls')
	const urlDoc = doc(col, url)
	const exists = (await getDoc(urlDoc)).exists()

	return !exists ?? false
}

// BORRAR URL
export const deleteURL = async (url: string): Promise<void> => {
	const { doc, deleteDoc } = await import('firebase/firestore')

	const col = await getCollection('urls')
	const urlDoc = doc(col, url)
	return deleteDoc(urlDoc)
}
