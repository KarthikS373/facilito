// TOOLS
import saveFormSchema from 'utils/forms'

/**
 * Borrar eventos de formulario
 * @description Borra todos los eventos de un formulario
 * @param  {string} formID
 * @param  {React.Dispatch<React.SetStateAction<FormInterface>>} setForms
 * @param  {(forms: FormInterface) => unknown} setGlobalForms
 * @param  {string} companyID
 */
const deleteForm = (
	formID: string,
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	setGlobalForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	companyID?: string
) => {
	if (companyID)
		window.Alert({
			title: 'Borrar tracking',
			body: '¿Estas seguro de que quieres borrar todos los estados de tracking presentes en este formulario?',
			type: 'confirm',
			onConfirm: async () => {
				// ACTUALIZAR
				setForms((prevForms: FormInterface) => {
					let answers = [...prevForms.answers]
					let forms = [...prevForms.forms]

					// BORRAR
					forms.forEach((fForm: Form) => {
						if (fForm.id === formID) fForm.tracking = []
					})

					// CONTEXTO
					const updatedForms = { forms, answers }

					window.Snack('Guardando...')
					saveFormSchema(companyID, { tracking: [], id: formID }).then(() =>
						window.Snack('Formulario guardado')
					)
					setGlobalForms(updatedForms)

					// ACTUALIZAR
					return updatedForms
				})
			},
		})
}

export default deleteForm
