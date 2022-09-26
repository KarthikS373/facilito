import { updateFormProp } from 'views/editForm/tools'
import { deleteURL, validateURL } from 'utils/urls'
import { FormsContextProps } from 'context/forms'

// PROPIEDADES
export interface FormTopbarProps {
	formData: React.MutableRefObject<Form>
	onChangeURL: (url: string) => Promise<void>
	onSave: (ctrl: boolean) => unknown
	onTitle: (title: string) => unknown
	onPublish: (published: boolean) => unknown
	onCustomize: EmptyFunction
}

enum MethodValue {
	whatsapp = 0,
	email = 1,
}

export interface SendData extends ConnectionMethods {
	link?: string
}

/**
 * Cambiar metodos de envio
 * @description Manejar cambios y errores en los inputs de whatsapp, email
 * @param key
 * @param ev
 * @param props
 * @param setErrs
 * @param setFormData
 */
const handleChecks = (
	key: 'whatsapp' | 'email',
	ev: React.ChangeEvent<HTMLInputElement>,
	setFormData: SetState<SendData>
): void => {
	setFormData((formData) => {
		// CHECKED
		const { checked } = ev.target

		// REMOVER
		let methods = [...(formData?.methods || [])]

		// AGREGAR
		if (checked) methods[MethodValue[key]] = key
		else methods = methods.filter((name) => name !== key && name !== undefined)
		methods = methods.filter(Boolean)

		return { ...formData, methods }
	})
}

/**
 * Validar link
 * @description Validar url dinamica si ya existe o no
 * @param props
 * @param formURL
 * @param setErrs
 */
export const validateFclt = (
	props: FormTopbarProps,
	formsCtx: FormsContextProps,
	formSendData: SendData,
	setUrlError: SetState<boolean>,
	urlError: boolean
): void => {
	// ACTUALIZAR
	const sendData = (change?: boolean) => {
		if (!urlError) {
			// GUARDAR
			window.Snack('Guardando ajustes...')
			const tmpData = {
				...(Object.fromEntries(
					Object.entries(formSendData).filter(([key]) => key.length > 0)
				) as SendData),
			}
			delete tmpData.link
			updateFormProp('answersConnection', tmpData, formsCtx, props.formData)
			props.onSave(false)
			if (change && formSendData.link) props.onChangeURL(formSendData.link)

			// SALIR
			window.hideAlert()
		}
	}

	// ACTUALIZAR URL
	if (props.formData.current.url !== formSendData.link) {
		if (formSendData.link) {
			validateURL(formSendData.link).then((validURL: boolean) => {
				if (validURL) {
					// BORRAR URL ANTERIOR
					deleteURL(props.formData.current.url).then(() => {
						if (formSendData.link) {
							setUrlError(false)
							sendData(true)
						}
					})
				} else setUrlError(true)
			})
		}
	}

	// CERRAR
	else {
		setUrlError(false)
		sendData()
	}
}

/**
 * Manejar inputs
 * @description Cambiar valores de inputs
 * @param ev
 * @param setFormData
 */
export const handleInputs = <T>(ev: T, field: string, setFormData: SetState<SendData>): void => {
	// GLOBAL
	let value: string | number = ''
	if (field === 'whatsapp') value = ev as string
	else value = (ev as React.ChangeEvent<HTMLInputElement>)?.target.value ?? ''

	// ACTUALIZAR
	setFormData((prevData) => ({ ...prevData, [field]: value ?? '' }))
}

/**
 * Valores por defecto
 * @description Crear valores por defecto para estado
 * @param props
 */
export const getDefValues = (form: React.MutableRefObject<Form>): SendData =>
	form.current.answersConnection
		? { ...form.current.answersConnection, link: form.current.url }
		: { methods: [], whatsapp: '', email: '', link: form.current.url }

export default handleChecks
