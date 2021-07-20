// UTILS
import { getCollection } from './db'

/**
 * Remover eventos
 * @param  {string} companyID
 * @param  {string} id
 * @description Remueve todos los eventos de un formulario
 */
export const removeEventForm = async (companyID: string, id: string) => {
	// LEER
	const businessCol = await getCollection('business')
	const formDoc = businessCol.doc(companyID).collection('events').doc(id)
	return await formDoc.delete()
}
