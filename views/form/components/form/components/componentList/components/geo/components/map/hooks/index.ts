import { useEffect } from 'react'
import { getPosition } from 'utils/location'
import { MAP_FRAME } from 'utils/maps'

/**
 * Hook de posicion inicial
 * @param  {SetState<string>} setLoad
 * @param  {string} langCode
 * @param  {string} place?
 */
const useInitialPosition = (setLoad: SetState<string>, langCode: string, place?: string): void => {
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

export default useInitialPosition
