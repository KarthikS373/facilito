import { FormsContextProps } from 'context/forms'
import { verifyEmail } from 'utils/auth'
import { deleteURL, validateURL } from 'utils/urls'
import { updateFormProp } from 'views/editForm/tools'

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
export const validateFclt = (
	props: FormTopbarProps,
	formsCtx: FormsContextProps,
	formSendData: SendData,
	setErrs: React.Dispatch<React.SetStateAction<[boolean, boolean, boolean]>>,
	errs: [boolean, boolean, boolean]
): void => {
	// ACTUALIZAR
	const sendData = (change?: boolean) => {
		if (errs.every((err) => err === false)) {
			// GUARDAR
			window.Snack('Guardando ajustes...')
			const tmpData = { ...formSendData }
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
	setErrs((errs) => {
		const tmpErrs = [...errs]
		if (
			(value ?? '').toString().length === 0 ||
			(name === 'whatsapp' && (value ?? '').toString().length < 6) ||
			(name === 'email' && !verifyEmail(value.toString()))
		) {
			if (name === 'whatsapp') tmpErrs[0] = true
			else if (name === 'email') tmpErrs[1] = true
			else if (name === 'link') tmpErrs[2] = true
		} else {
			if (name === 'whatsapp') tmpErrs[0] = false
			else if (name === 'email') tmpErrs[1] = false
			else if (name === 'link') tmpErrs[2] = false
		}

		return tmpErrs as [boolean, boolean, boolean]
	})

	// ACTUALIZAR
	setFormData((prevData) => ({ ...prevData, [name]: value ?? '' }))
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
