// REACT
import React, { useContext } from 'react'

// COMPONENTES
import Map from './components/map'

// CONTEXTO
import FormContext from '../../context'
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

const Geolocation: React.FC = () => {
	// FORM PROPS
	const { switch_2: switch2, text, helper, label } = useContext(FormContext)

	// STRINGS
	const { $ } = useStrings()

	if (!switch2)
		return (
			<>
				<h2 className={Styles.title}>{$`Nuestra Ubicacion`}</h2>
				<Map place={`${text},${helper} ${label}`} />
			</>
		)
	else return null
}

export default Geolocation
