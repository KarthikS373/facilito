import { getStorage, listAll, ref, StorageReference, deleteObject } from 'firebase/storage'
import getFirebase from 'keys/firebase'

/**
 * Borrar formulario en storage
 * @description Borra todos los archivos de un formulario
 * @param  {string} companyID
 * @param  {string} id
 */
export const removeFormStorage = async (companyID: string, id: string) => {
	// STORAGE
	const firebaseApp = await getFirebase()
	const str = getStorage(firebaseApp)
	const refName: string = `/${companyID}/forms/${id}`
	const refs = ref(str, refName)

	// LISTA
	const list = await listAll(refs)
	const deleteReq = list.items.map(async (list: StorageReference) => deleteObject(list))

	// BORRAR
	await Promise.all(deleteReq)
}
