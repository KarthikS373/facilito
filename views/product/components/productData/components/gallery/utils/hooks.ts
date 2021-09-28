// REACT
import { useEffect } from 'react'

/**
 * Hook de imaganes de producto
 * @description Actualiza la lista de imaganes por producto
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {React.Dispatch<React.SetStateAction<string[]>>} setImages
 * @param  {string} trigger
 */
const useImages = (
	productRef: React.MutableRefObject<Product>,
	setImages: React.Dispatch<React.SetStateAction<string[]>>,
	trigger: string
) => {
	useEffect(() => {
		const imagesRef: string[] = Array(4)
			.fill('')
			.map((_p: string, index: number) =>
				productRef.current.picture ? productRef.current.picture[index] || '' : ''
			)
		setImages(imagesRef)
	}, [trigger])
}

export default useImages
