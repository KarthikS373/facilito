// UTILS
import { updateAnswerState } from 'utils/answers'

/**
 * Actualizar estado de respuesta
 * @param  {EmptyFunction} onClose
 * @param  {number} currentIndex
 * @param  {number} index
 * @param  {number} step
 * @param  {string} filter
 * @param  {SetState<number>} setActiveStep
 * @param  {(index:number,newState:number)=>void} updateLocalAnswerState
 * @param  {string} formID?
 * @param  {string} companyID?
 */
const handleStep = (
	onClose: EmptyFunction,
	currentIndex: number,
	index: number,
	step: number,
	filter: string,
	setActiveStep: SetState<number>,
	updateLocalAnswerState: (index: number, newState: number) => void,
	formID?: string,
	companyID?: string
): void =>
	setActiveStep((prevActiveStep) => {
		// CALCULAR SIGUIENTE PASO
		const newStep: number = prevActiveStep + step

		if (newStep < 5) {
			window.Snack('Actualizando...')

			// ACTUALIZAR EN LOCAL Y DB
			updateAnswerState(index, newStep, formID, companyID)
			updateLocalAnswerState(currentIndex, newStep)

			// OCULTAR SI EXISTE EL FILTRO POR ESTADO
			if (filter === 'saz' || filter === 'sza') setTimeout(onClose, 400)

			// ALERTA
			window.Snack('Tracking actualizado')
		}

		return newStep
	})

export default handleStep
