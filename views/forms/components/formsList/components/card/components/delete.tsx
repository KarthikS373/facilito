// UTILS
import { removeBusinessForm } from 'utils/business'
import { removeFormStorage } from 'utils/storage'
import { removeAnswersForm } from 'utils/answers'
import { removeFormSchema } from 'utils/forms'
import { removeEventForm } from 'utils/events'

const showDeletePrompt = (
	$: (TemplateStringsArray) => string,
	companyID: string | null,
	formID: string,
	onDelete?: EmptyFunction
) => {
	window.Alert({
		title: $`Borrar formulario`,
		body: $`¿Estas seguro de que quieres borrar este formulario?, todos los datos relacionados se perderan.`,
		type: 'confirm',
		onConfirm: async () => {
			// CALLBACK
			onDelete && onDelete()

			// BORRAR
			await removeBusinessForm(companyID, formID)
			await removeFormStorage(companyID, formID)
			await removeAnswersForm(companyID, formID)
			await removeFormSchema(companyID, formID)
			await removeEventForm(companyID, formID)
		},
	})
}

export default showDeletePrompt
