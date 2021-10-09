// REACT
import { useEffect } from 'react'

/**
 * Hook de imagenes de producto
 * @description Actualiza la lista de imagenes por producto
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {React.Dispatch<React.SetStateAction<string[]>>} setImages
 * @param  {string} trigger
 */
const useImages = (
	productRef: React.MutableRefObject<Product>,
	setImages: React.Dispatch<React.SetStateAction<string[]>>,
	trigger: string
): void => {
	useEffect(() => {
		const imagesRef: string[] = Array(4)
			.fill('')
			.map((_p: string, index: number) =>
				productRef.current.picture ? productRef.current.picture[index] || '' : ''
			)
		setImages(imagesRef)
	}, [trigger, productRef, setImages])
}

export default useImages
