// DB
import { getCollection } from './db'

/**
 * Obtener documento de empresa
 * @param  {string} url
 * @description Retorna un documento de firestore asociado a una URL
 */
const getBusinessDoc = async (url: string) => {
	// COLECCIÓN DE EMPRESA
	const businessCol = await getCollection('business')
	const businessDoc = businessCol.doc(url)
	return businessDoc
}

/**
 * Obtener empresa
 * @param  {string} url
 * @description Retorna un documento Business asociado a un URL
 */
export const getCompany = async (url: string) => {
	if (url) {
		// DOCUMENTO DE EMPRESA
		const businessDoc = await getBusinessDoc(url)
		const businessData = (await businessDoc.get()).data() as Business
		return businessData
	} else return null
}
