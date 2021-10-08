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

// HOOKS
import { useTheme } from '@mui/material/styles'

// NEXT
import dynamic from 'next/dynamic'
const Topbar = dynamic(() => import('./components/topbar'))

const Layout: React.FC = (props) => {
	// TEMA
	const theme = useTheme()

	// ROUTER
	const router = useRouter()
	const path: string = router.asPath

	// MOSTRAR TOPBAR
	const showTopbar = evaluateTopbarPath(path)
	console.log(path)
	return (
		<div
			style={
				{
					'--primary': theme.palette.primary.main,
					'--secondary': theme.palette.secondary.main,
					'--primaryDark': theme.palette.primary.dark,
					backgroundColor: /^\/f\/\w+\/\w+$/.test(path) ? 'transparent' : '#fff',
				} as React.CSSProperties
			}
			className={`${Styles.container} ${path === ROUTES.login ? Styles.fullMain : ''}`}>
			{showTopbar && <Topbar showSearchBar />}
			<main
				style={{
					backgroundColor: /^\/f\/\w+\/\w+$/.test(path) ? 'transparent' : 'rgb(248, 248, 248)',
				}}>
				{props.children}
				<Footer />
			</main>
		</div>
	)
}

export default Layout
