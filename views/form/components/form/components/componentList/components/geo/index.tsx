// REACT
import React, { useContext } from 'react'

// COMPONENTES
import Map from './components/map'

// CONTEXTO
import FormContext from '../../context'

const Geolocation: React.FC = () => {
	// FORM PROPS
	const { switch_2: switch2, text, helper, label } = useContext(FormContext)

	if (!switch2) return <Map place={`${text},${helper} ${label}`} />
	else return null
}

export default Geolocation
