import firebase from 'keys/firebase'
import 'firebase/storage'

/**
 * Borrar formulario en stroage
 * @description Borra todos los archivos de un formulario
 * @param  {string} companyID
 * @param  {string} id
 */
export const removeFormStorage = async (companyID: string, id: string) => {
	// STORAGE
	const str = firebase.storage()
	const refName: string = `/${companyID}/forms/${id}`
	const ref = str.ref(refName)

	// LISTA
	const list = await ref.listAll()
	const deleteReq = list.items.map(async (list: firebase.storage.Reference) => list.delete())

	// BORRAR
	await Promise.all(deleteReq)
}
