import { compressImage } from 'utils/storage'
import { pad } from 'utils/tools'

export interface ImagesState {
	background: string
	banner: string
}

/**
 * Guardar archivo
 * @param  {React.ChangeEvent} ev
 * @param  {'background'|'banner'} prefix
 * @param  {(image:File)=>void} onBackground
 * @param  {(image:File)=>void} onBanner
 * @param  {SetState<ImagesState>} setImages
 */
const saveFile = (
	ev: React.ChangeEvent,
	prefix: 'background' | 'banner',
	onBackground: (image: File) => void,
	onBanner: (image: File) => void,
	setImages: SetState<ImagesState>
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
 * @param  {string} defaultBackground
 * @param  {string} defaultBanner
 * @returns {ImagesState}
 */
export const getDefValues = (defaultBackground: string, defaultBanner: string): ImagesState => ({
	banner: defaultBanner?.toString() ?? '',
	background: defaultBackground?.toString() ?? '',
})

/**
 * Cambiar colores
 * @param  {number} index
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {SetState<string[]>} setDefColors
 * @param  {(image:File|string)=>void} onBackground
 */
export const changeColors = (
	index: number,
	ev: React.ChangeEvent<HTMLInputElement>,
	setDefColors: SetState<string[]>,
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
 * @param  {number|number[]} newValue
 * @param  {SetState<string[]>} setDefColors
 * @param  {(image:File|string)=>void} onBackground
 */
export const changeColorDegrees = (
	newValue: number | number[],
	setDefColors: SetState<string[]>,
	onBackground: (image: File | string) => void
): void => {
	// ASIGNAR
	setDefColors((colors) => {
		const tmpColors = [...colors]
		tmpColors[2] = pad(newValue.toString(), 3)
		onBackground(
			`transparent linear-gradient(${tmpColors[2]}deg, ${tmpColors[0]} 0%, ${tmpColors[1]} 100%) 0% 0% no-repeat padding-box`
		)
		return tmpColors
	})
}

export default saveFile
