// TOOLS
import saveFormSchema from 'utils/forms'

/**
 * Borrar eventos de formulario
 * @description Borra todos los eventos de un formulario
 * @param  {string} formID
 * @param  {React.Dispatch<React.SetStateAction<FormInterface>>} setForms
 * @param  {(forms: FormInterface) => unknown} setGlobalForms
 * @param  {TemplateStrBuilder} $
 * @param  {string} companyID
 */
const deleteForm = (
	formID: string,
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	setGlobalForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	$: TemplateStrBuilder,
	companyID: string
) => {
	window.Alert({
		title: $`Borrar tracking`,
		body: $`¿Estas seguro de que quieres borrar todos los estados de tracking presentes en este formulario?`,
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
				setGlobalForms(updatedForms)
				saveFormSchema(companyID, { tracking: [], id: formID })

				// ACTUALIZAR
				return updatedForms
			})
		},
	})
}

export default deleteForm
