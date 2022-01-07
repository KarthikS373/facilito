import { useEffect } from 'react'

// TOOLS
import { getPosition } from 'utils/location'
import { MAP_FRAME } from 'utils/maps'

/**
 * Hook de position inicial
 * @param langCode
 * @param setLoad
 * @param place
 */
const usePosition = (langCode: string, setLoad: SetState<string>, place?: string): void => {
	// CARGAR POSICIÓN INICIAL
	useEffect(() => {
		if (!place || place.length === 0)
			getPosition().then((position: GeolocationPosition | undefined) => {
				setLoad(
					`${MAP_FRAME}&q=${position?.coords.latitude}, ${
						position?.coords.longitude
					}&language=${langCode.toLowerCase()}`
				)
			})
		else setLoad(`${MAP_FRAME}&q=${place}&language=${langCode.toLowerCase()}`)
	}, [langCode, place, setLoad])
}

export default usePosition
