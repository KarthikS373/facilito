import { getCollection } from './db'

/**
 * Listener de formularios
 * @description Crea un evento listener en la colecction "forms"
 * @param  {string} companyID
 * @param  {(forms:FormInterface)=>unknown} setForms
 */
export const answersListener = async (
	companyID: string,
	setAnswers: (forms: { [id: string]: FormAnswer }) => unknown
) => {
	// LEER
	const businessCol = await getCollection('business')
	const answersCol = businessCol.doc(companyID).collection('answers')

	// LISTENER
	return answersCol.onSnapshot((snap) => {
		const answers = Object.fromEntries(snap.docs.map((doc) => [doc.id, doc.data() as FormAnswer]))
		setAnswers(answers)
	})
}

/**
 * Comparar respuestas
 * @description Crea una comparación profunda entre respuestas en la db.
 * @param  {(FormAnswer|undefined)[]} first
 * @param  {(FormAnswer|undefined)[]} second
 * @param  {Form[]} forms
 */
export const getAnswersDifference = (
	first: (FormAnswer | undefined)[],
	second: (FormAnswer | undefined)[],
	forms: Form[]
) => {
	// OBTENER IDS
	const firstLengths: number[] = first.map((answers: FormAnswer | undefined) =>
		answers ? answers?.data.length : -1
	)
	const secondLengths: number[] = second.map((answers: FormAnswer | undefined) =>
		answers ? answers?.data.length : -1
	)

	// FILTRAR IDS
	const formsI: FormInterface = { forms: [], answers: [] }
	secondLengths
		.map((item: number, index: number) => firstLengths[index] !== item)
		.forEach((changedForm: boolean, index: number) => {
			if (changedForm) {
				formsI.forms.push(forms[index])
				if (second[index]) formsI.answers.push(second[index]!)
			} else return undefined
		})

	// RETORNAR
	return formsI
}

/**
 * Borrar respuestas
 * @description Borra todas las respuestas de un formulario
 * @param  {string} companyID
 * @param  {string} formID
 */
export const removeAnswersForm = async (companyID: string, formID: string) => {
	// LEER
	const businessCol = await getCollection('business')
	const formDoc = businessCol.doc(companyID).collection('answers').doc(formID)
	return await formDoc.delete()
}
