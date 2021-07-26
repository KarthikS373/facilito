import { getCollection } from './db'

/**
 * Obtener documento
 * @description Obtiene un documento en la colletion answers
 * @param  {string} companyID
 * @param  {string} formID
 */
const getAnswerDoc = async (companyID: string, formID: string) => {
	// LEER
	const businessCol = await getCollection('business')
	const formDoc = businessCol.doc(companyID).collection('answers').doc(formID)
	return formDoc
}

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

/**
 * Borrar respuesta
 * @description Ordena un objeto de respuestas segun el orden del formulario
 * @param  {FormComponent[]} components
 * @param  {FormAnswerItemContainer} formData
 */
export const deleteAnswer = async (index: number, formID?: string, companyID?: string) => {
	if (companyID && formID) {
		// LEER
		const answerDoc = await getAnswerDoc(companyID, formID)
		const companyAnswers = (await answerDoc.get()).data() as FormAnswer

		// BORRAR
		companyAnswers.data = companyAnswers.data.filter((_res: any, i: number) => index !== i)
		companyAnswers.dates = companyAnswers.dates.filter((_res: any, i: number) => index !== i)
		companyAnswers.states = companyAnswers.states.filter((_res: any, i: number) => index !== i)

		// ACTUALIZAR
		return answerDoc.set(companyAnswers)
	}
}

/**
 * Ordenar respuestas
 * @description Ordena un objeto de respuestas segun el orden del formulario
 * @param  {FormComponent[]} components
 * @param  {FormAnswerItemContainer} formData
 */
export const sortAnswers = (components: FormComponent[], formData: FormAnswerItemContainer) => {
	// CREAR TEXTO
	const data = { ...formData }
	let multiIndex: number = 0
	let orderedAnswers: FormSortedAnswer[] = []
	const dataKeys: string[] = Object.keys(data)

	// RECORRER
	components.forEach((component: FormComponent, index: number) => {
		// COMPONENTE
		const componentKey: string = `${component.name}_${component.id}`

		// BUSCAR
		if (component.name === 'multiple') multiIndex = index
		dataKeys.forEach((key: string) => {
			if (componentKey === key) {
				const answer: FormAnswerItem = data[key]
				orderedAnswers.push({ answer, key })
			}
		})
	})
	// DATOS PERSONALES
	const personalObj = [
		{ answer: data.personal_name_0, key: 'personal_name_0' },
		{ answer: data.personal_phone_0, key: 'personal_phone_0' },
		{ answer: data.personal_email_0, key: 'personal_email_0' },
		{ answer: data.personal_address_0, key: 'personal_address_0' },
		{ answer: data.personal_instructions_0, key: 'personal_instructions_0' },
	].filter((answer) => answer.answer !== undefined) as FormSortedAnswer[]

	// AGREGAR DATOS EXTRA
	orderedAnswers.splice(multiIndex, 0, ...personalObj)
	orderedAnswers.push({ answer: data.products_0, key: 'products_0' })

	// DATOS BANCARIOS
	orderedAnswers.push({ answer: data.payMethod, key: 'payMethod' })
	dataKeys.forEach((key: string) => {
		if (key.startsWith('bank_account_')) orderedAnswers.push({ answer: data[key], key })
	})

	// MÉTODOS DE ENVIÓ
	orderedAnswers.push({ answer: data.shippingMethod, key: 'shippingMethod' })

	// CUPONES Y TOTAL
	orderedAnswers.push({ answer: data.coupon, key: 'coupon' })
	orderedAnswers.push({ answer: data.total, key: 'total' })

	// RETORNAR
	const dataAnswers = orderedAnswers
		.filter((answer) => answer.answer !== undefined)
		.flat() as FormSortedAnswer[]
	return dataAnswers
}
