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
	const customersCol = collection(businessDoc, 'customers')
	const formDoc = doc(customersCol, formID)
	return formDoc
}

/**
 * Esta función toma una ID de empresa, una ID de cliente y un objeto de datos de cliente, y devuelve
 * una promesa que se resuelve en la cantidad de veces que el cliente completó el formulario.
 * @param {string} companyID - cuerda,
 * @param {string} id - string - El ID del cliente
 * @param {CustomerPersonalData} customerData - CustomerPersonalData
 * @returns Número de veces que se ha rellenado el formulario.
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
	const defCustomer: CustomerData = { data: [], dates: [] }
	const customersData = formData || defCustomer

	// AGREGAR
	customersData.dates.push(new Date())
	customersData.data.push(customerData)

	// GUARDAR
	await setDoc(formDoc, { ...customersData }, { merge: true })
	return customersData.data.length
}

/**
 * Escucha una colección de documentos, y cuando se agrega, actualiza o elimina un documento, actualiza
 * una matriz local de objetos.
 * @param {string} companyID - cuerda
 * @param setCustomers - (clientes: CustomerSelf[]) => vacío
 * @returns Una función que devuelve una promesa que se resuelve en una función de cancelación de
 * suscripción.
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
