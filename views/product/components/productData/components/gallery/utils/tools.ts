import { getDataURL } from 'utils/tools'

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
 * @param  {React.MutableRefObject<(File | null)[]>} imagesRef
 */
const updateImageList =
	(
		index: number,
		setImages: React.Dispatch<React.SetStateAction<string[]>>,
		productRef: React.MutableRefObject<Product>,
		imagesRef: React.MutableRefObject<(File | null)[]>
	) =>
	(ev: React.ChangeEvent<HTMLInputElement>) => {
		// ARCHIVOS
		const files = ev.target.files

		// OBTENER DATOS RAPIDO
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

		// GUARDAR ARCHIVOS EN REFERENCIA
		if (files) imagesRef.current[index] = files[0]
	}

export default updateImageList
