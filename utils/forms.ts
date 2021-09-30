// DB
import type { Unsubscribe } from '@firebase/firestore'
import { getCollection } from './db'
import removeFile from './storage'

/**
 * Leer documento
 * @description Retorna un documento en la db Forms
 * @param  {string} companyID
 * @param  {string} formID
 */
const getFormDoc = async (companyID: string, formID: string) => {
	const { doc, collection: getCollectionFrb } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const formsCol = getCollectionFrb(businessDoc, 'forms')
	const formDoc = doc(formsCol, formID)
	return formDoc
}

/**
 * Listener de formularios
 * @description Crea un evento listener en la collection "forms"
 * @param  {string} companyID
 * @param  {(forms:FormInterface)=>unknown} setForms
 */
export const formsListener = async (
	companyID: string,
	setForms: (forms: { [id: string]: Form }) => unknown
): Promise<Unsubscribe> => {
	const { doc, onSnapshot, collection: getCollectionFrb } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const formsCol = getCollectionFrb(businessDoc, 'forms')

	// LISTENER
	return onSnapshot(formsCol, (snap) => {
		const forms = Object.fromEntries(snap.docs.map((doc) => [doc.id, doc.data() as Form]))
		setForms(forms)
	})
}

/**
 * Borrar formulario en storage
 * @description Borra todos los archivos de un formulario
 * @param  {string} companyID
 * @param  {string} id
 */
export const removeFormFromStorage = async (companyID: string, id: string): Promise<void> => {
	return removeFile(`/${companyID}/forms/${id}`)
}

/**
 * Comparar formularios
 * @description Compara los cambios en los últimos formularios
 * @param  {Form[]} first
 * @param  {Form[]} second
 */
export const getFormsDifference = (first: Form[], second: Form[]): Form[] => {
	// OBTENER IDS
	const firstIds: string[] = first.map((form: Form) => form.url)
	const secondIds: string[] = second.map((form: Form) => form.url)

	// FILTRAR IDS
	const formsUnion: Form[] = first.concat(second)
	const filteredIds: string[] = firstIds
		.concat(secondIds)
		.filter((item) => !firstIds.includes(item) || !secondIds.includes(item))

	// DEVOLVER FORMULARIOS
	return filteredIds
		.map((id: string) => formsUnion.find((form: Form) => form.url === id))
		.filter((form: Form | undefined) => form !== undefined) as Form[]
}

/**
 * Formularios para templates
 * @description Obtiene los formularios en plantillasfacilito
 */
export const readTemplates = async (): Promise<Form[]> => {
	const { doc, getDocs, collection: getCollectionFrb } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, 'plantillasfacilito')
	const formsCol = getCollectionFrb(businessDoc, 'forms')
	const form = (await getDocs(formsCol)).docs.map((doc) => doc.data()) as Form[]

	return form
}

/**
 * Guardar formulario
 * @description Guarda un objeto Form en la DB
 * @param  {string} companyID
 * @param  {Partial<Form>} form
 */
const saveFormSchema = async (companyID: string, form: Partial<Form>): Promise<void> => {
	const { setDoc } = await import('firebase/firestore')

	if (form.id) {
		// LEER
		const formDoc = await getFormDoc(companyID, form.id)

		// GUARDAR
		if (formDoc) await setDoc(formDoc, form, { merge: true })
	}
}

export default saveFormSchema

/**
 * Borrar formulario
 * @description Borra un formulario en 'forms'
 * @param  {string} companyID
 * @param  {string} id
 */
export const removeFormSchema = async (companyID: string, id: string): Promise<void> => {
	const { deleteDoc } = await import('firebase/firestore')

	// LEER
	const formDoc = await getFormDoc(companyID, id)

	// BORRAR
	if (formDoc) return deleteDoc(formDoc)
}
