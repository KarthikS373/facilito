import saveFormSchema from 'utils/forms'

/**
 * Guardar estados
 * @description Actualiza en la DB y en el contexto
 * @param  {React.MutableRefObject<FormTrackingStep[]>} localTracking
 * @param  {string} formID
 * @param  {string} companyID
 */
const saveStates = (
	localTracking: React.MutableRefObject<FormTrackingStep[]>,
	formID: string,
	companyID?: string
): void => {
	// GUARDAR
	if (companyID) {
		window.Snack('Guardando...')
		saveFormSchema(companyID, {
			id: formID,
			tracking: localTracking.current,
		}).then(() => window.Snack('Guardado correctamente'))
	}
}

/**
 * Agregar estado de tracking
 * @description Agrega un objeto step vacio
 * @param  {string} formID
 * @param  {React.MutableRefObject<FormTrackingStep[]>} localTracking
 * @param  {React.Dispatch<React.SetStateAction<FormInterface>>} setForms
 */
export const addNewState = (
	localTracking: React.MutableRefObject<FormTrackingStep[]>,
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	formID?: string
): void => {
	if (localTracking.current.length < 5 && formID) {
		const emptyStep: FormTrackingStep = { name: '', description: '', color: 'var(--primary)' }
		localTracking.current.push(emptyStep)
		setForms((prevForms: FormInterface) => {
			// BUSCAR
			const newForms = { ...prevForms }
			const formIndex: number = newForms.forms.findIndex((form: Form) => form.id === formID)

			// ACTUALIZAR
			if (formIndex >= 0) newForms.forms[formIndex].tracking = localTracking.current
			return newForms
		})
	}
}

export default saveStates
