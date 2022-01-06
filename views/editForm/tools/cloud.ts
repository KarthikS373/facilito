// UTILS
import saveFormSchema from 'utils/forms'

/**
 * @description Guardar tienda en DB
 * @param ctrl
 * @param componentsList
 * @param formData
 * @param company
 * @param lang
 * @param enableUrl
 */
export const saveFormOnCloud = async (
	ctrl: boolean,
	formData: React.MutableRefObject<Form>,
	company: Business | null
): Promise<void> => {
	// BUSCAR ERRORES
	if (ctrl) {
		// ERROR
		let emptyError = false

		formData.current.components.forEach((component: BlockComponent) => {
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

	// GUARDAR
	if (company) await saveFormSchema(company?.id, formData.current)
}

/**
 * Guardar metodos de envio
 * @param formData
 * @param answersConnection
 */
export const saveSendMethods = (
	formData: React.MutableRefObject<Form>,
	answersConnection?: ConnectionMethods
): void => {
	if (!answersConnection) delete formData.current.answersConnection
	else formData.current.answersConnection = answersConnection
}
