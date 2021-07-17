// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import AddNewForm from './components/addNew'
import Templates from './components/templates'

const NewForm: React.FC = () => {
	return (
		<div className={Styles.container}>
			<AddNewForm />
			<Templates />
		</div>
	)
}

export default NewForm
