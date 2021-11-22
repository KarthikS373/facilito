import { compressImage } from 'utils/storage'
import { pad } from 'utils/tools'

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
	prefix: 'background' | 'banner',
	onBackground: (image: File) => void,
	onBanner: (image: File) => void,
	setImages: React.Dispatch<React.SetStateAction<ImagesState>>
): void => {
	// ARCHIVOS
	const inp = ev.target as HTMLInputElement
	const files = inp.files

	// LEER
	if (files && files[0]) {
		// SUBIR A CLOUD
		compressImage(files[0]).then((image: File) => {
			const reader = new FileReader()
			reader.onloadend = () => {
				const src: string = reader.result?.toString() ?? ''

				// CAMBIAR FONDO
				setImages((prevImages) => ({ ...prevImages, [prefix]: src }))
				if (prefix === 'background') onBackground(image)
				else if (prefix === 'banner') onBanner(image)
			}

			reader.readAsDataURL(image)
		})
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
export const getDefValues = (defaultBackground: string, defaultBanner: string): ImagesState => ({
	banner: defaultBanner?.toString() ?? '',
	background: defaultBackground?.toString() ?? '',
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
	setDefColors: React.Dispatch<React.SetStateAction<[string, string, string]>>,
	onBackground: (image: File | string) => void
): void => {
	// VALOR
	const value: string = ev.target.value

	// ASIGNAR
	setDefColors((colors) => {
		const tmpColors = [...colors]
		tmpColors[index] = value.toString()

		onBackground(
			`transparent linear-gradient(${tmpColors[2]}deg, ${tmpColors[0]} 0%, ${tmpColors[1]} 100%) 0% 0% no-repeat padding-box`
		)

		return tmpColors as [string, string, string]
	})
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
	setDefColors: React.Dispatch<React.SetStateAction<[string, string, string]>>,
	onBackground: (image: File | string) => void
): void => {
	// ASIGNAR
	setDefColors((colors) => {
		const tmpColors = [...colors]
		tmpColors[2] = pad(newValue.toString(), 3)
		onBackground(
			`transparent linear-gradient(${tmpColors[2]}deg, ${tmpColors[0]} 0%, ${tmpColors[1]} 100%) 0% 0% no-repeat padding-box`
		)
		return tmpColors as [string, string, string]
	})
}

export default saveFile
