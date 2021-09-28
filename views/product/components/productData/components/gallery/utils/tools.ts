/**
 * Obtener imagen de input
 * @description Retorna una imagen como DataURL de un input
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {(data:string | ArrayBuffer | null) => void} imageCallback
 */
const getDataURL = (
	ev: React.ChangeEvent<HTMLInputElement>,
	imageCallback: (data: string | ArrayBuffer | null) => void
) => {
	const tgt = ev.target || window.event?.srcElement,
		files = tgt.files

	// FileReader support
	if (FileReader && files && files.length) {
		const fr = new FileReader()
		fr.onload = () => imageCallback(fr.result)
		fr.readAsDataURL(files[0])
	}
}

/**
 * Remover imagen de lista
 * @description Quita una imagen en una posicion
 * @param  {number} index
 * @param  {React.Dispatch<React.SetStateAction<string[]>>} setImages
 * @param  {React.MutableRefObject<Product>} productRef
 */
export const removeImage =
	(
		index: number,
		setImages: React.Dispatch<React.SetStateAction<string[]>>,
		productRef: React.MutableRefObject<Product>
	) =>
	() => {
		setImages((prevImages: string[]) => {
			const tmpImages: string[] = [...prevImages].map((image: string, imageIndex: number) =>
				imageIndex === index ? '' : image
			)
			productRef.current.picture = tmpImages
			return tmpImages
		})
	}

/**
 * Actualizar lista de imagenes
 * @description Actualiza el estado de la lista de imagenes
 * @param  {number} index
 * @param  {React.Dispatch<React.SetStateAction<string[]>>} setImages
 * @param  {React.MutableRefObject<Product>} productRef
 */
const updateImageList =
	(
		index: number,
		setImages: React.Dispatch<React.SetStateAction<string[]>>,
		productRef: React.MutableRefObject<Product>
	) =>
	(ev: React.ChangeEvent<HTMLInputElement>) => {
		getDataURL(ev, (data: string | ArrayBuffer | null) => {
			if (typeof data === 'string') {
				setImages((prevImages: string[]) => {
					const tmpImages: string[] = [...prevImages]
					tmpImages[index] = data
					ev.target.value = ''
					productRef.current.picture = tmpImages
					return tmpImages
				})
			}
		})
	}

export default updateImageList
