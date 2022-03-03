// DB
import { getCollection } from './db'

/**
 * Obtener documento de empresa
 * @param  {string} url
 * @description Retorna un documento de firestore asociado a una URL
 */
const getBusinessDoc = async (url: string) => {
	const { doc } = await import('firebase/firestore')

	// COLECCIÓN DE EMPRESA
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, url)
	return businessDoc
}

/**
 * Obtener empresa
 * @param  {string} url
 * @returns {Promise<Business | null>}
 */
export const getCompany = async (url: string): Promise<Business | null> => {
	if (url) {
		const { getDoc } = await import('firebase/firestore')

		// DOCUMENTO DE EMPRESA
		const businessDoc = await getBusinessDoc(url)
		const businessData = (await getDoc(businessDoc)).data() as Business
		return businessData
	} else return null
}

/**
 * Agregar tienda
 * @param  {string} id
 * @param  {string} companyID
 * @returns {Promise<void>}
 */
export const addBusinessFormURL = async (id: string, companyID: string): Promise<void> => {
	// COLECCIÓN DE EMPRESA
	const { getDoc, setDoc } = await import('firebase/firestore')
	const businessDoc = await getBusinessDoc(companyID)
	const businessData = (await getDoc(businessDoc)).data() as Business | undefined
	const forms = businessData?.forms || []

	// AGREGAR
	forms.push(id)

	// ACTUALIZAR
	if (businessData) {
		businessData.forms = forms
		return setDoc(businessDoc, businessData)
	}
}

/**
 * Remplazar negocio
 * @param  {string} companyID
 * @param  {Partial<Business> | null} business
 * @returns {Promise<void>}
 */
export const replaceBusiness = async (
	companyID: string,
	business: Partial<Business> | null
): Promise<void> => {
	const { setDoc } = await import('firebase/firestore')

	// COLECCIÓN DE EMPRESA
	const businessDoc = await getBusinessDoc(companyID)

	// LISTAs
	if (business) setDoc(businessDoc, business, { merge: true })
}
