// REACT
import { useEffect } from 'react'

// UTILS
import { readFormSchema } from 'utils/forms'
import { getQRCode } from 'utils/tools'

/**
 * Guardar y leer tienda
 * @description Guardar datos de tienda en db
 * @param formData
 * @param company
 * @param id
 * @param user
 * @param componentsList
 * @param setComponents
 * @param setFormProps
 * @param setFormCheckout
 * @param setOpenSplash
 * @param formTitle
 */
export const useCloudForm = (
	formData: React.MutableRefObject<Form>,
	company: Business | null,
	id: string,
	user: User | null,
	componentsList: React.MutableRefObject<BlockComponent[]>,
	setComponents: React.Dispatch<React.SetStateAction<FormContainerProps[]>>,
	setFormProps: React.Dispatch<React.SetStateAction<CustomFormState>>,
	setFormCheckout: React.Dispatch<React.SetStateAction<FormCheckout | undefined>>,
	formTitle?: string
): void => {
	// GUARDAR EN CLOUD
	useEffect(() => {
		// ASIGNAR DATOS NORMALES
		formData.current.id = id
		formData.current.url = `${company?.url}_${id}`

		if (formTitle) formData.current.title = formTitle
		formData.current.badge = company?.badge.trim() || 'GTQ'
		formData.current.lang = company?.lang || 'es'
		formData.current.company = {
			user: user?.email || '',
			url: company?.url || '',
		}

		// CREAR
		const setQRCode = () =>
			getQRCode(`${window.location.origin}/f/${company?.url}/${formData.current.url}`).then(
				(url: string) => (formData.current.qr = url)
			)

		// LEER TIENDA
		if (company?.id)
			readFormSchema(company?.id, formData.current.id).then((form: Form | null) => {
				if (form) {
					// GUARDAR EN REFERENCIAS
					formData.current = form
					componentsList.current = form.components
					formData.current.company = {
						user: user?.email || '',
						url: company?.url || '',
					}
					formData.current.badge = company?.badge.trim() || 'GTQ'
					formData.current.lang = company?.lang || 'es'

					// CREAR CÓDIGO QR
					if (!form.qr.length) setQRCode()

					// ACTUALIZAR ESTADOS
					setComponents(form.components)
					setFormProps({
						title: form.title,
						description: form.description,
						background: form.background,
						banner: form.banner,
						url: form.url,
					})
					setFormCheckout(form.checkout)
				} else {
					setQRCode().then(() => {
						setFormProps({
							title: formData.current.title,
							description: formData.current.description,
							background: formData.current.background,
							banner: formData.current.banner,
							url: formData.current.url,
						})
					})
				}
			})
	}, [
		company,
		id,
		user,
		formTitle,
		componentsList,
		setComponents,
		setFormProps,
		setFormCheckout,
		formData,
	])
}
