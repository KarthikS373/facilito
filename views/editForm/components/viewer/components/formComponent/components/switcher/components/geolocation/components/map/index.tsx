// REACT
// REACT
import useStrings from 'hooks/lang'
import React, { useEffect, useState } from 'react'

// UTILS
import { getPosition } from 'utils/location'
import { MAP_FRAME } from 'utils/maps'

interface MapProps {
	place?: string
	className?: string
}

const Map: React.FC<MapProps> = ({ place, className }) => {
	// ESTADO
	const [load, setLoad] = useState<string>('')

	// LENGUAJE
	const { langCode } = useStrings()

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
	}, [langCode, place])

	return (
		<iframe
			className={className}
			title='Map'
			src={load}
			width='100%'
			height='100%'
			frameBorder='0'
			allowFullScreen
		/>
	)
}

export default Map
