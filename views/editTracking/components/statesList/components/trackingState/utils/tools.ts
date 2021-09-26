/**
 * Borrar estado
 * @description Borra un estado del tracking en la DB y contexto
 * @param  {number} index
 * @param  {string} formID
 * @param  {string} companyID
 * @param  {React.MutableRefObject<FormTrackingStep[]>} localTracking
 * @param  {React.Dispatch<React.SetStateAction<FormInterface>>} setForms
 */
const deleteState = (
	index: number,
	formID: string,
	localTracking: React.MutableRefObject<FormTrackingStep[]>,
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	companyID?: string
) => {
	if (companyID) {
		window.Alert({
			title: 'Borrar estado',
			body: '¿Estas seguro se querer borrar este estado?, presiona Guardar estados para hacer efectivos los cambios.',
			type: 'confirm',
			onConfirm: () => {
				// ASIGNAR
				localTracking.current = localTracking.current.filter(
					(_step, stepIndex: number) => stepIndex !== index
				)
				setForms((prevForms: FormInterface) => {
					// BUSCAR
					const newForms = { ...prevForms }
					const formIndex: number = newForms.forms.findIndex((form: Form) => form.id === formID)

					// ACTUALIZAR
					if (formIndex >= 0) newForms.forms[formIndex].tracking = localTracking.current
					return newForms
				})
			},
		})
	}
}

/**
 * Cambiar estado
 * @description Actualiza los valores de un estado
 * @param  {number} index
 * @param  {ev: React.ChangeEvent<HTMLInputElement>} ev
 * @param  {React.MutableRefObject<FormTrackingStep[]>} localTracking
 * @param  {React.Dispatch<React.SetStateAction<FormTrackingStep>>} setStep
 */
export const onStateChange = (
	index: number,
	ev: React.ChangeEvent<HTMLInputElement>,
	localTracking: React.MutableRefObject<FormTrackingStep[]>,
	setStep: React.Dispatch<React.SetStateAction<FormTrackingStep>>
) => {
	const { value, name } = ev.target
	setStep((prevStep: FormTrackingStep) => {
		const newStep = { ...prevStep, [name]: value }
		localTracking.current[index] = newStep
		return newStep
	})
}

/**
 * Cambiar Color
 * @description Actualiza el color de un estado
 * @param  {number} index
 * @param  {string} color
 * @param  {React.MutableRefObject<FormTrackingStep[]>} localTracking
 * @param  {React.Dispatch<React.SetStateAction<FormTrackingStep>>} setStep
 */
export const changeStateColor = (
	index: number,
	color: string,
	onClose: EmptyFunction,
	localTracking: React.MutableRefObject<FormTrackingStep[]>,
	setStep: React.Dispatch<React.SetStateAction<FormTrackingStep>>
) => {
	onClose()
	setStep((prevStep: FormTrackingStep) => {
		const newStep = { ...prevStep, color }
		localTracking.current[index] = newStep
		return newStep
	})
}

/**
 * Limpiar estado
 * @description Reinicia todos los inputs de un estado
 * @param  {number} index
 * @param  {React.MutableRefObject<FormTrackingStep[]>} localTracking
 * @param  {React.Dispatch<React.SetStateAction<FormTrackingStep>>} setStep
 */
export const clearStateInputs = (
	index: number,
	localTracking: React.MutableRefObject<FormTrackingStep[]>,
	setStep: React.Dispatch<React.SetStateAction<FormTrackingStep>>
) => {
	// LIMPIAR
	const newStep = { name: '', description: '', color: 'var(--primary)' }

	// ACTUALIZAR
	localTracking.current[index] = newStep
	setStep(newStep)
}

export default deleteState
