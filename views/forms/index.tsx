// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTS
import Topbar from './components/topbar'

const Forms = () => {
	return (
		<main className={Styles.main}>
			<Topbar showSearchBar={false} />
		</main>
	)
}

export default Forms
