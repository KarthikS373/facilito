import firebase from 'keys/firebase'

/**
 * Borrar formulario en storage
 * @description Borra todos los archivos de un formulario
 * @param  {string} companyID
 * @param  {string} id
 */
export const removeFormStorage = async (companyID: string, id: string) => {
	// STORAGE
	const str = (await firebase()).storage()
	const refName: string = `/${companyID}/forms/${id}`
	const ref = str.ref(refName)

	// LISTA
	const list = await ref.listAll()
	const deleteReq = list.items.map(async (list: firebase.default.storage.Reference) =>
		list.delete()
	)

	// BORRAR
	await Promise.all(deleteReq)
}
