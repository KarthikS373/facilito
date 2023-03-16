import { getCollection } from './db'
import type { Unsubscribe } from '@firebase/firestore'

/**
 * Obtenga el documento de historial de existencias para la empresa dada y el formulario de
 * identificación.
 * @param {string} companyID - cuerda
 * @param {string} formID - cuerda
 * @returns Una promesa que se resuelve en una referencia de documento.
 */
const getStockHistoryDoc = async (companyID: string, formID: string) => {
	const { collection, doc } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const historyCol = collection(businessDoc, 'stockHistory')
	const formDoc = doc(historyCol, formID)
	return formDoc
}

/**
 * @param {string} companyID - cuerda,
 * @param {string} id - cuerda,
 * @param {StockHistoryData} historyData - StockHistoryData
 * @returns La longitud de la matriz.
 */
export const saveFormStockHistory = async (
	companyID: string,
	id: string,
	historyData: StockHistoryData
): Promise<number> => {
	const { getDoc, setDoc } = await import('firebase/firestore')

	// LEER
	const formDoc = await getStockHistoryDoc(companyID, id)
	const formData = (await getDoc(formDoc)).data() as FormStockHistory

	// VALORES POR DEFECTO
	const defHistory: FormStockHistory = { data: [], dates: [] }
	const newHistoryData = formData || defHistory

	// AGREGAR
	newHistoryData.dates.push(new Date())
	newHistoryData.data.push(historyData)

	// GUARDAR
	await setDoc(formDoc, { ...newHistoryData }, { merge: true })
	return newHistoryData.data.length
}

/**
 * Escucha una colección de documentos y, cuando se agrega un documento, agrega los datos de ese
 * documento a una matriz.
 *
 * @param {string} companyID - cuerda
 * @param setStockHistory - (clientes: StockHistorySelf[]) => vacío
 * @returns Una función que devuelve una promesa que se resuelve en una función.
 */
export const stockListener = async (
	companyID: string,
	setStockHistory: (customers: StockHistorySelf[]) => void
): Promise<Unsubscribe> => {
	const { collection, doc, onSnapshot } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const stockHistoryCol = collection(businessDoc, 'stockHistory')

	// LISTENER
	return onSnapshot(stockHistoryCol, (snap) => {
		const stockRows = Object.fromEntries(
			snap.docs.map((doc) => [doc.id, doc.data() as FormStockHistory])
		)

		const stockRowsArray = Object.entries(stockRows)
			.map(([formId, stockRow]) =>
				stockRow.data.map((stockData, index) => ({
					formId,
					data: stockData,
					date: stockRow.dates[index],
				}))
			)
			.flat() as StockHistorySelf[]

		// ACTUALIZAR
		setStockHistory(stockRowsArray)
	})
}

export const getStockHistory = async (companyID: string, formID: string) => {
	const { getDoc } = await import('firebase/firestore')

	const docRef = await getStockHistoryDoc(companyID, formID)

	return getDoc(docRef)
}
