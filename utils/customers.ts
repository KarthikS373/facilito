import type { Unsubscribe } from '@firebase/firestore'
import { getCollection } from './db'

/**
 * Obtener documento
 * @param  {string} companyID
 * @param  {string} formID
 */
const getCustomerDoc = async (companyID: string, formID: string) => {
	const { collection, doc } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const answersCol = collection(businessDoc, 'customers')
	const formDoc = doc(answersCol, formID)
	return formDoc
}

/**
 * Guardar respuesta
 * @param  {string} companyID
 * @param  {string} id
 * @param  {FormAnswerItemContainer} form
 * @returns {Promise<number>}
 */
export const saveFormCustomer = async (
	companyID: string,
	id: string,
	customerData: CustomerPersonalData
): Promise<number> => {
	const { getDoc, setDoc } = await import('firebase/firestore')

	// LEER
	const formDoc = await getCustomerDoc(companyID, id)
	const formData = (await getDoc(formDoc)).data() as CustomerData

	// VALORES POR DEFECTO
	const defAnswers: CustomerData = { data: [], dates: [] }
	const customersData = formData || defAnswers

	// AGREGAR
	customersData.dates.push(new Date())
	customersData.data.push(customerData)

	// GUARDAR
	await setDoc(formDoc, { ...customersData }, { merge: true })
	return customersData.data.length
}

/**
 * Listener de tiendas
 * @param  {string} companyID
 * @param  {(forms:Record<string,FormAnswer>)=>unknown} setAnswers
 * @returns {Promise<Unsubscribe>}
 */
export const customersListener = async (
	companyID: string,
	setCustomers: (customers: CustomerSelf[]) => void
): Promise<Unsubscribe> => {
	const { collection, doc, onSnapshot } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const customersCol = collection(businessDoc, 'customers')

	// LISTENER
	return onSnapshot(customersCol, (snap) => {
		const customers = Object.fromEntries(
			snap.docs.map((doc) => [doc.id, doc.data() as CustomerData])
		)
		const customersArray = Object.values(customers)
			.map((customer) =>
				customer.data.map((customerData, index) => ({
					data: customerData,
					date: customer.dates[index],
				}))
			)
			.flat() as CustomerSelf[]

		// ACTUALIZAR
		setCustomers(customersArray)
	})
}
