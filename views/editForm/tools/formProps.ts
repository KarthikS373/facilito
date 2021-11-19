// UTILS
import saveFormSchema, { replaceFormURL } from 'utils/forms'
import { getQRCode } from 'utils/tools'

/**
 * Actualizar url
 * @description Actualizar y verificar nueva url para tienda
 * @param newUrl
 * @param formData
 * @param company
 * @param saveCurrentForm
 * @param setFormProps
 * @param enableUrl
 */
export const updateUrl = async (
	newUrl: string,
	formData: React.MutableRefObject<Form>,
	company: Business | null,
	saveCurrentForm: (ctrl: boolean) => unknown,
	setFormProps: React.Dispatch<React.SetStateAction<CustomFormState>>,
	enableUrl: React.MutableRefObject<boolean>
): Promise<void> => {
	// COPIAR Y ASIGNAR
	const id: string = formData.current.id
	formData.current.url = newUrl

	// REMPLAZAR
	if (company?.id) {
		// HABILITAR CAMBIO DE URL
		enableUrl.current = true
		delete formData.current.fclt

		// REMPLAZAR
		await replaceFormURL(company.id, id, newUrl)
		// CREAR QR NUEVO
		const qrUrl = await getQRCode(`${window.location.origin}/f/${company?.url}/${newUrl}`)
		formData.current.qr = qrUrl

		// GUARDAR
		await saveCurrentForm(false)

		// ACTUALIZAR
		setFormProps((prevProps: CustomFormState) => ({ ...prevProps, url: newUrl }))
	}
}

/**
 * Inputs personales
 * @description Actualizar inputs de datos de personales
 * @param formData
 * @param personalOptions
 * @param components
 */
export const updatePersonalInputs = (
	formData: React.MutableRefObject<Form>,
	personalOptions: FormPersonalData,
	components: FormContainerProps[]
): void => {
	formData.current.includePersonalData = personalOptions

	// BUSCAR COMPONENTE DE CALENDARIO ( CORREO OBLIGATORIO )
	components.forEach((component: FormContainerProps) => {
		if (component.name.startsWith('date')) formData.current.includePersonalData.email = true
	})
}

/**
 * Opciones de de checkout
 * @description Actualizar opciones de checkout
 * @param formData
 * @param checkoutOptions
 * @param setCheckoutOptions
 * @param companyID
 */
export const updateCheckoutOptions = (
	formData: React.MutableRefObject<Form>,
	checkoutOptions: FormCheckout,
	setCheckoutOptions: React.Dispatch<React.SetStateAction<FormCheckout | undefined>>,
	companyID?: string
): void => {
	// ASIGNAR PROPS
	formData.current.checkout = checkoutOptions
	formData.current.checkout.noEmptyCart = true

	// GUARDAR Y ACTUALIZAR
	if (companyID)
		saveFormSchema(companyID, { checkout: checkoutOptions, id: formData.current.id }).then(() =>
			setCheckoutOptions(checkoutOptions)
		)
}
