// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// CONTEXTO
import FormContext from '../../context'

// COMPONENTES
import ComponentSwitcher from './components/switcher'

const FormComponent: React.FC = () => {
	// CONTEXTO
	const { name, switch_1: switchP } = useContext(FormContext)

	if (name === 'coupons' && !switchP) return <></>
	else
		return (
			<div className={Styles.container}>
				<div className={Styles.content}>
					<ComponentSwitcher name={name} />
				</div>
			</div>
		)
}

export default FormComponent
