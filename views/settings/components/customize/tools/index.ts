/**
 * Actualizar referencia de imagen
 * @param  {'back'|'bann'} type
 * @param  {React.MutableRefObject<string|File>} backgroundRef
 * @param  {React.MutableRefObject<string|File>} bannerRef
 * @param  {SetState<string|undefined>} setCustomBackground
 * @param  {File|string} image
 */
const setImageRef = (
	type: 'back' | 'bann',
	backgroundRef: React.MutableRefObject<string | File>,
	bannerRef: React.MutableRefObject<string | File>,
	setCustomBackground: SetState<string | undefined>,
	image: File | string
): void => {
	if (type === 'back') {
		backgroundRef.current = image
		bannerRef.current = ''
		if (typeof image === 'string' && image.length) setCustomBackground(image)
		else {
			// LEER DE ARCHIVO
			const reader = new FileReader()
			reader.onload = () => {
				const src: string = reader.result?.toString() ?? ''

				// CAMBIAR FONDO
				setCustomBackground(src)
			}

			reader.readAsDataURL(image as File)
		}
	} else {
		bannerRef.current = image
		backgroundRef.current = ''
	}
}

export default setImageRef
