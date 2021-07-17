// DB
import { getCollection } from './db'

/**
 * Listener de formularios
 * @description Crea un evento listener en la colecction "forms"
 * @param  {string} companyID
 * @param  {(forms:FormInterface)=>unknown} setForms
 */
export const formsListener = async (
	companyID: string,
	setForms: (forms: FormInterface) => unknown
) => {
	// LEER
	const businessCol = await getCollection('business')
	const formsCol = businessCol.doc(companyID).collection('forms')
	const answersCol = businessCol.doc(companyID).collection('answers')

	// FORMULARIOS
	const formDocs = (await formsCol.get()).docs
	const formSchemas = Object.fromEntries(
		formDocs
			.sort((fDoc, nDoc) => {
				if (fDoc.id < nDoc.id) return -1
				else if (fDoc.id > nDoc.id) return 1
				else return 0
			})
			.map((doc) => [doc.id, doc.data()]) as [string, Form][]
	)

	// LISTENER
	return answersCol.onSnapshot((snap) => {
		// RESPUESTAS
		const totalAnswers = Object.fromEntries(
			snap.docs.map((doc) => [doc.id, doc.data()]) as [string, FormAnswer][]
		)

		// FILTRAR
		let answers: FormAnswer[] = []
		let forms: Form[] = []
		Object.keys(formSchemas).forEach((key: string) => {
			answers.push(totalAnswers[key])
			forms.push(formSchemas[key])
		})

		// ENVIAR
		const formInterface: FormInterface = {
			forms,
			answers,
		}

		// ENVIAR
		setForms(formInterface)
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
