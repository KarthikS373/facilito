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
			<div className={Style.slider}>
				<TemplateInfo />
				<Forms />
			</div>
		</div>
	)
}

export default Templates
