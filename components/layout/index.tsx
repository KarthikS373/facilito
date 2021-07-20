// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import Topbar from './components/topbar'
import Footer from './components/footer'

const Layout: React.FC = (props) => {
	return (
		<div className={Styles.container}>
			<Topbar showSearchBar />
			<main>
				{props.children}
				<Footer />
			</main>
		</div>
	)
}

export default Layout
