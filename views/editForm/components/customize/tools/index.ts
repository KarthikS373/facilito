import { compressImage, getURL, uploadFile } from 'utils/storage'

export interface CustomizeMenuProps {
	onBanner: (bannerString: string) => unknown
	onColor: (backString: string) => unknown
	defaultBackground: string
	defaultBanner: string
	onBack: EmptyFunction
	open: boolean
	id: string
}

export interface ImagesState {
	background: string
	banner: string
}

/**
 * Guardar archivo
 * @description Guardar archivos de banner y background
 * @param ev
 * @param prefix
 * @param company
 * @param props
 * @param setImages
 */
const saveFile = (
	ev: React.ChangeEvent,
	prefix: string,
	company: Business | null,
	props: CustomizeMenuProps,
	setImages: React.Dispatch<React.SetStateAction<ImagesState>>
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
		if (company?.id) {
			const path = `/${company?.id}/${prefix}/${props.id}}`
			compressImage(files[0]).then((image: File) => {
				uploadFile(image, path).then(() => {
					getURL(path).then((src: string) => {
						if (src) {
							// REGRESAR
							window.hideAlert()

							// CAMBIAR FONDO
							setImages((prevImages) => ({ ...prevImages, [prefix]: src }))
							if (prefix === 'background') props.onColor(src)
							else if (prefix === 'banner') props.onBanner(src)
						}
					})
				})
			})
		}
	}

	// REINICIAR
	inp.value = ''
}

/**
 * Valores por defecto
 * @description Obtener valores por defecto para estado de imagenes
 * @param props
 * @returns
 */
export const getDefValues = (props: CustomizeMenuProps): ImagesState => ({
	banner: props.defaultBanner ?? '',
	background: props.defaultBackground ?? '',
})

/**
 * Cambiar colores
 * @description Cambiar gradiente de colores para fondo
 * @param index
 * @param ev
 * @param onColor
 * @param defColors
 */
export const changeColors = (
	index: number,
	ev: React.ChangeEvent<HTMLInputElement>,
	colors: React.MutableRefObject<string[]>
): void => {
	// VALOR
	const value: string = ev.target.value

	// ASIGNAR
	colors.current[index] = value
}

/**
 * Cambiar inclinacion
 * @description Cambiar inclinacion de fondo con gradientes
 * @param newValue
 * @param onColor
 * @param defColors
 */
export const changeColorDegrees = (
	newValue: number | number[],
	colors: React.MutableRefObject<string[]>
): void => {
	// ASIGNAR
	colors.current[2] = newValue.toString()
}

/**
 * Guardar colores
 * @description Guardar los colores en el formulario
 * @param colors
 * @param onColor
 */
export const saveColors = (
	colors: React.MutableRefObject<string[]>,
	onColor: (back: string) => void,
	onBack: EmptyFunction
): void => {
	onColor(
		`transparent linear-gradient(${colors.current[2]}deg, ${colors.current[0]} 0%, ${colors.current[1]} 100%) 0% 0% no-repeat padding-box`
	)
	onBack()
}

export default saveFile
