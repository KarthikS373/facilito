// DB
import { getCollection } from './db'

/**
 * Leer documento
 * @description Retorna un documento en la db Forms
 * @param  {string} companyID
 * @param  {string} formID
 */
const getFormDoc = async (companyID: string, formID: string) => {
	// LEER
	const businessCol = await getCollection('business')
	const formDoc = businessCol.doc(companyID).collection('forms').doc(formID)
	return formDoc
}

/**
 * Listener de formularios
 * @description Crea un evento listener en la colecction "forms"
 * @param  {string} companyID
 * @param  {(forms:FormInterface)=>unknown} setForms
 */
export const formsListener = async (
	companyID: string,
	setForms: (forms: { [id: string]: Form }) => unknown
) => {
	// LEER
	const businessCol = await getCollection('business')
	const formsCol = businessCol.doc(companyID).collection('forms')

	// LISTENER
	return formsCol.onSnapshot((snap) => {
		const forms = Object.fromEntries(snap.docs.map((doc) => [doc.id, doc.data() as Form]))
		setForms(forms)
	})
}

/**
 * Comparar formularios
 * @description Compara los cambios en los ultimos formularios
 * @param  {Form[]} first
 * @param  {Form[]} second
 */
export const getFormsDifference = (first: Form[], second: Form[]) => {
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
export const readTemplates = async () => {
	// LEER
	const businessCol = await getCollection('business')
	const formDoc = businessCol.doc('plantillasfacilito').collection('forms')
	const form = (await formDoc.get()).docs.map((doc) => doc.data()) as Form[]

	return form
}

/**
 * Guardar formulario
 * @description Guarda un objeto Form en la DB
 * @param  {string} companyID
 * @param  {Partial<Form>} form
 */
const saveFormSchema = async (companyID: string, form: Partial<Form>) => {
	if (form.id) {
		// LEER
		const formDoc = await getFormDoc(companyID, form.id)

		// GUARDAR
		if (formDoc) await formDoc.set(form, { merge: true })
	}
}

export default saveFormSchema

/**
 * Borrar formulario
 * @description Borra un formulario en 'forms'
 * @param  {string} companyID
 * @param  {string} id
 */
export const removeFormSchema = async (companyID: string, id: string) => {
	// LEER
	const formDoc = await getFormDoc(companyID, id)

	// BORRAR
	if (formDoc) return formDoc.delete()
}
