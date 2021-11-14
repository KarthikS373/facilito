// UTILS
import saveFormSchema from 'utils/forms'
import { saveUrl } from 'utils/urls'

/**
 * @description Guardar formulario en DB
 * @param ctrl
 * @param componentsList
 * @param formData
 * @param company
 * @param lang
 * @param enableUrl
 */
export const saveFormOnCloud = async (
	ctrl: boolean,
	componentsList: React.MutableRefObject<BlockComponent[]>,
	formData: React.MutableRefObject<Form>,
	company: Business | null,
	enableUrl: React.MutableRefObject<boolean>
): Promise<void> => {
	// BUSCAR ERRORES
	if (ctrl) {
		// ERROR
		let emptyError = false

		// RECORRER
		const componentsCopy = [...componentsList.current]
		componentsCopy.forEach((component: BlockComponent) => {
			if (component.name !== 'multiple') {
				if (component.name !== 'image' && component.name !== 'video') {
					if (component.label.length === 0)
						// ERROR
						emptyError = true
					if (component.name === 'link') {
						if (component.href?.length === 0) emptyError = true
					} else if (component.name === 'date') {
						if (!component.time || !component.duration || component.duration === 0)
							emptyError = true
					} else if (component.name === 'coupons') emptyError = false
					else if (component.helper.length === 0 && !component.values) emptyError = true
					if (component.values && component.values[0] === '') emptyError = true
				} else if (!component.alt || component.alt?.length === 0) emptyError = true
			}
		})

		// ALERTA DE ERROR
		if (emptyError)
			window.Alert({
				title: 'Campos vacíos',
				body: 'Algunos bloques tienen campos vacíos, es probable que algunos bloques no se muestren como deseas.',
				type: 'error',
			})
	}

	// GUARDAR URL
	if (enableUrl.current && company?.id) {
		saveUrl(formData.current.fclt !== undefined, formData.current.url, {
			target: `${window.location.origin}/f/${company?.url}/${formData.current.url}`,
			info: {
				companyID: company.id,
				formID: formData.current.id,
			},
		})
		enableUrl.current = false
	}

	// GUARDAR
	formData.current.components = componentsList.current
	if (company) await saveFormSchema(company?.id, formData.current)
}
