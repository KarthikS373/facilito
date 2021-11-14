// DB
import { getCollection } from './db'

/**
 * @description Guardar nueva URL
 * @param alreadyFclt
 * @param fcltCode
 * @param fcltRequest
 * @returns
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
 * @description Validar que una url no exista para actualizar
 * @param url
 * @returns
 */
export const validateURL = async (url: string): Promise<boolean> => {
	const { doc, getDoc } = await import('firebase/firestore')

	const col = await getCollection('urls')
	const urlDoc = doc(col, url)
	const exists = (await getDoc(urlDoc)).exists

	return !exists ?? false
}

// BORRAR URL
export const deleteURL = async (url: string): Promise<void> => {
	const { doc, deleteDoc } = await import('firebase/firestore')

	const col = await getCollection('urls')
	const urlDoc = doc(col, url)
	return deleteDoc(urlDoc)
}
