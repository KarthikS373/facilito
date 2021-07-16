// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import Topbar from './components/topbar'

const Layout:React.FC = props => {
	return (
		<div className={Styles.container}>
			<Topbar showSearchBar={false} />
			<main>
				{props.children}
			</main>
		</div>
	)
}

export default Layout