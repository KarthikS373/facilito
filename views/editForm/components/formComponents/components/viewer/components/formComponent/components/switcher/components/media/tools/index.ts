import { compressImage, getURL, uploadFile } from 'utils/storage'

/**
 * Leer y subir archivo
 * @param ev
 * @param id
 * @param business
 * @param setCurrentImage
 */
const readFile = (
	ev: React.ChangeEvent,
	id: number,
	business: Business | null,
	setCurrentImage: SetState<string | null>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	// ARCHIVOS
	const inp = ev.target as HTMLInputElement
	const files = inp.files

	// LEER
	if (files && files[0]) {
		// ALERTA
		window.Alert({
			title: 'Espera...',
			body: 'Se esta subiendo tu archivo, esto dependerá de tu velocidad, no te salgas de la aplicación por favor.',
			type: 'window',
			fixed: true,
		})

		// SUBIR A CLOUD
		if (business?.id) {
			const path = `/${business?.id}/forms/${id}}`
			compressImage(files[0]).then((image: File) => {
				uploadFile(image, path).then(() => {
					getURL(path).then((src: string) => {
						if (src) {
							window.hideAlert()
							if (onChange) onChange('src', src)
							setCurrentImage(src)
						}
					})
				})
			})
		}
	}
	inp.value = ''
}

export default readFile
