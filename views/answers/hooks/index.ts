// React
import { useEffect } from 'react'
import { filterAnswers } from '../tools'

/**
 * Hook de respuestas de tienda
 * @description Obtiene las respuestas de una tienda desde su ID
 * @param  {string} filter
 * @param  {string} formID
 * @param  {FormInterface} forms
 * @param  {string} changesTrigger
 * @param  {SetState<FormAnswerSelf[]>} setAnswers
 */
export const useFilters = (
	filter: string,
	formID: string,
	forms: FormInterface,
	setAnswers: SetState<FormAnswerSelf[]>
): void => {
	useEffect(() => {
		// BUSCAR
		const formIndex: number = forms.forms.findIndex((form: Form) => form.id === formID)
		const answers: FormAnswer | undefined = forms.answers[formIndex]

		// ACTUALIZAR
		setAnswers(
			filterAnswers(
				answers?.data.map((data: FormAnswerItemContainer, index: number) => ({
					data,
					date: answers.dates[index],
					index: index + 1,
					stateIndex: answers.states[index] || 0,
				})) || [],
				filter
			)
		)
	}, [filter, formID, forms.answers, forms.forms, setAnswers])
}
