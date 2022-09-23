// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// NEXT
import { useRouter } from 'next/router'

// UTILS
import evaluateToShowTopbar, { evaluateToHideFooter } from './tools'

// RUTAS
import ROUTES from 'router/routes'

// COMPONENTES
import Footer from './components/footer'

// HOOKS
import { useTheme } from '@mui/material/styles'

// NEXT
import dynamic from 'next/dynamic'
const Topbar = dynamic(() => import('./components/topbar'))

const Layout: React.FC<{
	children: React.ReactNode
}> = (props) => {
	// ESTADO
	const [expanded, setExpanded] = useState<boolean>(true)

	// TEMA
	const theme = useTheme()

	// ROUTER
	const router = useRouter()
	const path: string = router.asPath

	// MOSTRAR TOPBAR
	const minimizeFooter = evaluateToHideFooter(path)
	const showTopbar = evaluateToShowTopbar(path)

	// PUBLIC PATH
	const isPublic = /\/e\/(.+)/.test(path) && path !== ROUTES.edit

	return (
		<div
			style={
				{
					'--primary': theme.palette.primary.main,
					'--secondary': theme.palette.secondary.main,
					'--primaryDark': theme.palette.primary.dark,
					'--secondaryDark': theme.palette.secondary.dark,
					backgroundColor: !showTopbar ? 'transparent' : '#fff',
					alignItems: isPublic ? 'center' : 'unset',
					gridTemplateColumns: expanded ? '300px 1fr' : '90px 1fr',
					display: !showTopbar ? 'flex' : 'grid',
					justifyContent: !showTopbar ? 'center' : 'unset',
				} as React.CSSProperties
			}
			className={`${Styles.container} ${path === ROUTES.login ? Styles.fullMain : ''}`}>
			{showTopbar && <Topbar expanded={expanded} showSearchBar setExpanded={setExpanded} />}
			<main
				style={{
					backgroundColor: !showTopbar ? 'transparent' : 'rgb(248, 248, 248)',
					width: !showTopbar ? '100%' : 'auto',
				}}>
				{props.children}
				<Footer
					hideFooter={!showTopbar}
					minimize={minimizeFooter}
					radius={isPublic ? '0 0 var(--radius) var(--radius)' : undefined}
				/>
			</main>
		</div>
	)
}

export default Layout
