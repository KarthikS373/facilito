// REACT
import { useEffect } from 'react'

/**
 * Hook de imagenes de producto
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {SetState<string[]>} setImages
 * @param  {string} trigger
 */
const useImages = (
	productRef: React.MutableRefObject<Product>,
	setImages: SetState<string[]>,
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
