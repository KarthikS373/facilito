import React, { useEffect } from 'react'
import { getPosition } from 'utils/location'
import { MAP_FRAME } from 'utils/maps'

/**
 * Hook de posicion inicial
 * @description Cargar posicion inicial desde la api de google maps
 * @param setLoad
 * @param langCode
 * @param place
 */
const useInitialPosition = (
	setLoad: React.Dispatch<React.SetStateAction<string>>,
	langCode: string,
	place?: string
): void => {
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
