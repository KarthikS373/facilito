// REACT
import React from 'react'

// ESTILOS
import Style from './style.module.scss'

// COMPONENTES
import TemplateInfo from './components/info'
import Forms from './components/forms'

const Templates: React.FC = () => {
	return (
		<div className={Style.container}>
			<TemplateInfo />
			<Forms />
		</div>
	)
}

export default Templates
