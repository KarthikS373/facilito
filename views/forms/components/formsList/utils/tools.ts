// UTILS
import { removeAnswersForm } from 'utils/answers'
import { removeFormSchema } from 'utils/forms'
import { removeEventForm } from 'utils/events'
import removeFile from 'utils/storage'

/**
 * Borrar formulario
 * @description Borra un formulario del estado
 * @param  {string} formID
 * @param  {React.Dispatch<React.SetStateAction<FormInterface>>} setForms
 * @param  {(forms: FormInterface) => unknown} setGlobalForms
 * @param  {string} companyID
 */
const deleteForm = (
	formID: string,
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	setGlobalForms: (forms: Partial<FormInterface>) => unknown,
	companyID?: string
): void => {
	window.Alert({
		title: 'Borrar formulario',
		body: '¿Estas seguro de que quieres borrar este formulario?, todos los datos relacionados se perderan.',
		type: 'confirm',
		onConfirm: async () => {
			// ACTUALIZAR
			setForms((prevForms: FormInterface) => {
				let answers = [...prevForms.answers]
				let forms = [...prevForms.forms]
				let formIndex = 0

				// BORRAR
				forms = forms.filter((fForm: Form, index: number) => {
					if (fForm.id === formID) {
						formIndex = index
						return false
					} else return true
				})
				answers = answers.filter(
					(_answer: FormAnswer | undefined, index: number) => index !== formIndex
				)

				// CONTEXTO
				const updatedForms = { forms, answers }
				setGlobalForms(updatedForms)

				// ACTUALIZAR
				return updatedForms
			})

			// BORRAR
			window.Snack('Borrando...')
			if (companyID) {
				await removeFile(`/${companyID}/${formID}`)
				await removeAnswersForm(companyID, formID)
				await removeFormSchema(companyID, formID)
				await removeEventForm(companyID, formID)
				window.Snack('Formulario borrado')
			}
		},
	})
}

export default deleteForm
