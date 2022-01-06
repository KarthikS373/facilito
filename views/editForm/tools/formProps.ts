// UTILS
import saveFormSchema, { replaceFormURL } from 'utils/forms'
import { FormsContextProps } from 'context/forms'
import { getQRCode } from 'utils/tools'
import { updateFormProp } from '.'

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
	formsCtx: FormsContextProps
): Promise<void> => {
	// COPIAR Y ASIGNAR
	const id: string = formData.current.id
	formData.current.url = newUrl

	// REMPLAZAR
	if (company?.id) {
		// HABILITAR CAMBIO DE URL
		delete formData.current.fclt

		// REMPLAZAR
		await replaceFormURL(company.id, id, newUrl)

		// CREAR QR NUEVO
		const qrUrl = await getQRCode(`${window.location.origin}/f/${company?.url}/${newUrl}`)
		formData.current.qr = qrUrl

		// GUARDAR
		await saveCurrentForm(false)

		// ACTUALIZAR
		updateFormProp('url', newUrl, formsCtx, formData)
	}
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
