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
