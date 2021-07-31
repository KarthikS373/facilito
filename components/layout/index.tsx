// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// NEXT
import { useRouter } from 'next/router'

// RUTAS
import ROUTES from 'router/routes'

// COMPONENTES
import Topbar from './components/topbar'
import Footer from './components/footer'

const Layout: React.FC = (props) => {
	// ROUTER
	const router = useRouter()
	const path: string = router.asPath

	return (
		<div className={`${Styles.container} ${path === ROUTES.login ? Styles.fullMain : ''}`}>
			<Topbar showSearchBar />
			<main>
				{props.children}
				<Footer />
			</main>
		</div>
	)
}

export default Layout
