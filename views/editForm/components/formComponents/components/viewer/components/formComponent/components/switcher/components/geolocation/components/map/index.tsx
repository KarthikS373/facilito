// REACT
import React, { useState } from 'react'

// HOOKS
import useStrings from 'hooks/lang'
import usePosition from './hooks'

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
	usePosition(langCode, setLoad, place)

	return (
		<iframe
			title='Map'
			src={load}
			width='100%'
			height='100%'
			frameBorder='0'
			allowFullScreen
			className={className}
		/>
	)
}

export default Map
