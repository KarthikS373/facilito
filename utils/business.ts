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

/**
 * Agregar formulario
 * @param  {string} id
 * @param  {string} companyID
 * @description Agrega una url al arreglo de formularios
 */
export const addBusinessFormURL = async (id: string, companyID: string) => {
	// COLECCIÓN DE EMPRESA
	const businessDoc = await getBusinessDoc(companyID)
	const businessData = (await businessDoc.get()).data() as Business | undefined
	const forms = businessData?.forms || []

	// AGREGAR
	forms.push(id)

	// ACTUALIZAR
	if (businessData) {
		businessData.forms = forms
		return businessDoc.set(businessData)
	}
}

/**
 * Remover formulario
 * @param  {string} companyID
 * @param  {string} id
 * @description Remueve una url al arreglo de formularios
 */
export const removeBusinessForm = async (companyID: string, id: string) => {
	// COLECCIÓN DE EMPRESA
	const businessDoc = await getBusinessDoc(companyID)

	// LISTA
	const businessData = (await businessDoc.get()).data() as Business | undefined
	const forms = businessData?.forms || []

	// REMOVER
	const formsFiltered = forms.filter((formId: string) => formId !== id)
	if (businessData) {
		businessData.forms = formsFiltered

		// ACTUALIZAR
		return businessDoc.set(businessData)
	}
}
