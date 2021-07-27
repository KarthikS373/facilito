// React
import { useEffect } from 'react'
import { filterAnswers } from './tools'

/**
 * Hook de respuestas de formulario
 * @description Obtiene las respuestas de un formulario desde su ID
 * @param  {string} filter
 * @param  {string} formID
 * @param  {FormInterface} forms
 * @param  {number} changesTrigger
 * @param  {React.Dispatch<React.SetStateAction<FormAnswerSelf[]>>} setAnswers
 */
export const useFilters = (
	filter: string,
	formID: string,
	forms: FormInterface,
	changesTrigger: number,
	setAnswers: React.Dispatch<React.SetStateAction<FormAnswerSelf[]>>
) => {
	useEffect(() => {
		// BUSCAR
		const formIndex: number = forms.forms.findIndex((form: Form) => form.id === formID)
		const answers: FormAnswer = forms.answers[formIndex]

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
	}, [filter, formID, changesTrigger])
}

/**
 * Hook de filtro inicial
 * @description Actualiza el filtro de respuestas con el localStorage
 * @param  {React.Dispatch<React.SetStateAction<string>>} setFilter
 */
export const useInitialFilter = (setFilter: React.Dispatch<React.SetStateAction<string>>) => {
	useEffect(() => {
		setFilter(window.localStorage.getItem('answers-filter') || 'naz')
	}, [])
}
