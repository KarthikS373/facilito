// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// NEXT
import { useRouter } from 'next/router'

// UTILS
import evaluateTopbarPath from './utils/tools'

// RUTAS
import ROUTES from 'router/routes'

// COMPONENTES
import Footer from './components/footer'

// NEXT
import dynamic from 'next/dynamic'
const Topbar = dynamic(() => import('./components/topbar'))

const Layout: React.FC = (props) => {
	// ROUTER
	const router = useRouter()
	const path: string = router.asPath

	// MOSTRAR TOPBAR
	const showTopbar = evaluateTopbarPath(path)

	return (
		<div className={`${Styles.container} ${path === ROUTES.login ? Styles.fullMain : ''}`}>
			{showTopbar && <Topbar showSearchBar />}
			<main>
				{props.children}
				<Footer />
			</main>
		</div>
	)
}

export default Layout
