import { verifyEmail } from 'utils/auth'
import { deleteURL, validateURL } from 'utils/urls'

// PROPIEDADES
export interface FormTopbarProps {
	onAnswersConnection: (answersConnection?: ConnectionMethods) => unknown
	onChangeCheckoutOptions?: (options: FormCheckout) => unknown
	onChangeURL: (url: string) => Promise<void>
	onPublish: (published: boolean) => unknown
	answersConnection?: ConnectionMethods
	onTitle: (title: string) => unknown
	onSave: (ctrl: boolean) => unknown
	checkoutOptions?: FormCheckout
	onCustomize: EmptyFunction
	defValue?: string
	public: boolean
	formQR: string
	url: string
	id: string
}

enum MethodValue {
	whatsapp = 0,
	email = 1,
}

export interface SendData extends ConnectionMethods {
	link?: string
}

// PROPS PARA MENU
export interface SettingsMenuProps extends FormTopbarProps {
	connectionMethods?: ConnectionMethods
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
	setErrs: React.Dispatch<React.SetStateAction<[boolean, boolean, boolean]>>,
	setFormData: React.Dispatch<React.SetStateAction<SendData>>
): void => {
	setFormData((formData) => {
		// CHECKED
		const { checked } = ev.target

		// REMOVER
		let methods = [...(formData?.methods || [])]

		// AGREGAR
		if (checked) {
			// WHATSAPP
			if (key === 'whatsapp') {
				if (formData.whatsapp && formData.whatsapp?.length >= 6) {
					setErrs((prevErrs: [boolean, boolean, boolean]) => [false, false, prevErrs[2]])
					methods[MethodValue[key]] = key
				} else setErrs((prevErrs: [boolean, boolean, boolean]) => [true, false, prevErrs[2]])
			}

			// EMAIL
			else if (key === 'email') {
				if (formData.email && verifyEmail(formData.email)) {
					setErrs((prevErrs: [boolean, boolean, boolean]) => [false, false, prevErrs[2]])
					methods[MethodValue[key]] = key
				} else setErrs((prevErrs: [boolean, boolean, boolean]) => [false, true, prevErrs[2]])
			}
		} else methods = methods.filter((name) => name !== key && name !== undefined)

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
// TODO: Verificar que valide bien el link
export const validateFclt = (
	props: SettingsMenuProps,
	formData: SendData,
	setErrs: React.Dispatch<React.SetStateAction<[boolean, boolean, boolean]>>,
	errs: [boolean, boolean, boolean]
): void => {
	// ACTUALIZAR
	const sendData = (change?: boolean) => {
		if (errs.every((err) => err === false)) {
			// GUARDAR
			window.Snack('Guardando ajustes...')
			const tmpData = { ...formData }
			delete tmpData.link
			props.onAnswersConnection(tmpData)
			props.onSave(false)
			if (change && formData.link) props.onChangeURL(formData.link)

			// SALIR
			window.hideAlert()
		}
	}

	// ACTUALIZAR URL
	if (props.url !== formData.link) {
		if (formData.link) {
			validateURL(formData.link).then((validURL: boolean) => {
				if (validURL) {
					// BORRAR URL ANTERIOR
					deleteURL(props.url).then(() => {
						if (formData.link) {
							setErrs((prevErrs: [boolean, boolean, boolean]) => [prevErrs[0], prevErrs[1], false])
							sendData(true)
						}
					})
				} else setErrs((prevErrs: [boolean, boolean, boolean]) => [prevErrs[0], prevErrs[1], true])
			})
		}
	}

	// CERRAR
	else {
		setErrs((prevErrs: [boolean, boolean, boolean]) => [prevErrs[0], prevErrs[1], false])
		sendData()
	}
}

/**
 * Manejar inputs
 * @description Cambiar valores de inputs
 * @param ev
 * @param setFormData
 */
export const handleInputs = <T extends unknown>(
	ev: T,
	setFormData: React.Dispatch<React.SetStateAction<SendData>>,
	setErrs: React.Dispatch<React.SetStateAction<[boolean, boolean, boolean]>>
): void => {
	// GLOBAL
	let name = ''
	let value: string | number = ''
	if (typeof ev === 'string') {
		name = 'whatsapp'
		value = ev
	} else {
		name = (ev as React.ChangeEvent<HTMLInputElement>)?.target.name ?? ''
		value = (ev as React.ChangeEvent<HTMLInputElement>)?.target.value ?? ''
	}

	// ERRORES
	if ((value ?? '').toString().length === 0 || (name === 'whatsapp' && (value ?? '').length < 6)) {
		setErrs((errs) => {
			const tmpErrs = [...errs]
			if (name === 'whatsapp') tmpErrs[0] = true
			else if (name === 'email') tmpErrs[1] = true
			else if (name === 'link') tmpErrs[2] = true
			return tmpErrs as [boolean, boolean, boolean]
		})
	}

	// ACTUALIZAR
	setFormData((prevData) => ({ ...prevData, [name]: value ?? '' }))
}

/**
 * Valores por defecto
 * @description Crear valores por defecto para estado
 * @param props
 */
export const getDefValues = (props: SettingsMenuProps): SendData =>
	props.connectionMethods
		? { ...props.connectionMethods, link: props.url }
		: { methods: [], whatsapp: '', email: '', link: props.url }

export default handleChecks
