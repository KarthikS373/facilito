// React
import { useEffect } from 'react'
import { filterAnswers } from './tools'

/**
 * Hook de respuestas de formulario
 * @description Obtiene las respuestas de un formulario desde su ID
 * @param  {string} formID
 * @param  {FormInterface} forms
 * @param  {number} changesTrigger
 * @param  {React.Dispatch<React.SetStateAction<FormAnswerSelf[]>>} setAnswers
 */
const useAnswers = (
	formID: string,
	forms: FormInterface,
	changesTrigger: number,
	setAnswers: React.Dispatch<React.SetStateAction<FormAnswerSelf[]>>
) => {
	useEffect(() => {
		// BUSCAR
		const formIndex: number = forms.forms.findIndex((form: Form) => form.id === formID)
		const answers: FormAnswer = forms.answers[formIndex]
		const tracking: FormTrackingStep[] = forms.forms[formIndex]?.tracking || []

		// ACTUALIZAR
		setAnswers(
			answers?.data.map((data: FormAnswerItemContainer, index: number) => ({
				data,
				date: answers.dates[index],
				state: tracking[answers.states[index]]?.name || '',
				index: index + 1,
			})) || []
		)
	}, [formID, changesTrigger])
}

export default useAnswers

/**
 * Hook de filtros
 * @description Reordena las respuestas segun un filtro
 * @param  {React.Dispatch<React.SetStateAction<FormAnswerSelf[]>>} setAnswers
 * @param  {string} filter
 */
export const useFilters = (
	setAnswers: React.Dispatch<React.SetStateAction<FormAnswerSelf[]>>,
	filter: string
) => {
	useEffect(() => {
		setAnswers((prevAnswers) => filterAnswers(prevAnswers, filter))
	}, [filter])
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
