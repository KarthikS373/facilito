// REACT
import React, { useState } from 'react'

// HOOKS
import useInitialPosition from './hooks'
import useStrings from 'hooks/lang'

interface MapProps {
	place?: string
}

const Map: React.FC<MapProps> = ({ place }: MapProps) => {
	// ESTADO
	const [load, setLoad] = useState<string>('')

	// LENGUAJE
	const { langCode } = useStrings()

	// CARGAR POSICIÓN INICIAL
	useInitialPosition(setLoad, langCode, place)

	return <iframe title='Map' src={load} width='100%' height='300' frameBorder='0' allowFullScreen />
}

export default Map
