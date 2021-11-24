// REACT
import { useEffect } from 'react'

// TOOLS
import { ImagesState, getDefValues } from '../tools'

/**
 * Hook para propiedades del estado
 * @param {string} defaultBackground
 * @param {string} defaultBanner
 * @param {React.Dispatch<React.SetStateAction<ImagesState>>} setImages
 * @param {React.Dispatch<React.SetStateAction<[string, string, string]>>} setDefColors
 */
const useStateProps = (
	defaultBackground: string,
	defaultBanner: string,
	setImages: React.Dispatch<React.SetStateAction<ImagesState>>
): void => {
	useEffect(() => {
		setImages(getDefValues(defaultBackground, defaultBanner))
	}, [defaultBackground, defaultBanner, setImages])
}

export default useStateProps
