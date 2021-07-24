/**
 * Borrar formulario
 * @description Borra un formulario del estado
 * @param  {string} formID
 * @param  {React.Dispatch<React.SetStateAction<FormInterface>>} setForms
 * @param  {React.Dispatch<React.SetStateAction<Business>>} setBusiness
 */
const deleteForm = (
	formID: string,
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	setGlobalForms: (forms: FormInterface) => unknown
) => {
	setForms((prevForms: FormInterface) => {
		let answers = [...prevForms.answers]
		let forms = [...prevForms.forms]
		let formIndex: number = 0

		// BORRAR
		forms = forms.filter((fForm: Form, index: number) => {
			if (fForm.id === formID) {
				formIndex = index
				return false
			} else return true
		})
		answers = answers.filter((_answer: FormAnswer, index: number) => index !== formIndex)

		// CONTEXTO
		const updatedForms = { forms, answers }
		setGlobalForms(updatedForms)

		// ACTUALIZAR
		return updatedForms
	})
}

export default deleteForm
