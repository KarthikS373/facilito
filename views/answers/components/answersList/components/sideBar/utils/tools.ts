// UTILS
import { updateAnswerState } from 'utils/answers'

/**
 * Actualizar estado de respuesta
 * @description Mueve una posicion el estado (tracking) de una respuesta
 * @param  {number} currentIndex
 * @param  {number} index
 * @param  {number} step
 * @param  {React.Dispatch<React.SetStateAction<number>>} setActiveStep
 * @param  {(index:number, newState:number) => void} updateLocalAnswerState
 * @param  {string} formID
 * @param  {string} companyID
 */
const handleStep = (
	currentIndex: number,
	index: number,
	step: number,
	setActiveStep: React.Dispatch<React.SetStateAction<number>>,
	updateLocalAnswerState: (index: number, newState: number) => void,
	formID?: string,
	companyID?: string
) =>
	setActiveStep((prevActiveStep) => {
		const newStep: number = prevActiveStep + step
		window.Snack('Actualizando...')
		updateAnswerState(index, newStep, formID, companyID)
		updateLocalAnswerState(currentIndex, newStep)
		window.Snack('Tracking actualizado')
		return newStep
	})

export default handleStep
