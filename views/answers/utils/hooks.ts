// React
import { useEffect } from 'react'

/**
 * Hook de respuestas de formulario
 * @description Obtiene las respuestas de un formulario desde su ID
 * @param  {string} formID
 * @param  {FormInterface} forms
 * @param  {number} changesTrigger
 * @param  {React.Dispatch<React.SetStateAction<{answers: FormAnswertracking: FormTrackingStep[]}>>} setAnswers
 */
const useAnswers = (
	formID: string,
	forms: FormInterface,
	changesTrigger: number,
	setAnswers: React.Dispatch<
		React.SetStateAction<{
			answers: FormAnswer
			tracking: FormTrackingStep[]
		}>
	>
) => {
	useEffect(() => {
		// BUSCAR
		const formIndex: number = forms.forms.findIndex((form: Form) => form.id === formID)
		const answers: FormAnswer = forms.answers[formIndex]
		const tracking: FormTrackingStep[] = forms.forms[formIndex]?.tracking || []

		// ACTUALIZAR
		setAnswers({
			answers,
			tracking,
		})
	}, [formID, changesTrigger])
}

export default useAnswers
