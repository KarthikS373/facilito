// REACT
import { useEffect } from 'react'

// TOOLS
import { ImagesState, getDefValues } from '../tools'

/**
 * Hook para propiedades del estado
 * @param {string} defaultBackground
 * @param {string} defaultBanner
 * @param {SetState<ImagesState>} setImages
 */
const useStateProps = (
	defaultBackground: string,
	defaultBanner: string,
	setImages: SetState<ImagesState>
): void => {
	useEffect(() => {
		setImages(getDefValues(defaultBackground, defaultBanner))
	}, [defaultBackground, defaultBanner, setImages])
}

export default useStateProps
