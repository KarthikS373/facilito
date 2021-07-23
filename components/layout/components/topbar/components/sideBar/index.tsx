// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// NEXT
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

// RUTAS
import ROUTES from 'router/routes'

// ICONS
import ShoppingCartTwoTone from '@material-ui/icons/ShoppingCartTwoTone'
import DescriptionTwoTone from '@material-ui/icons/DescriptionTwoTone'
import ComputerTwoTone from '@material-ui/icons/ComputerTwoTone'
import TodayTwoTone from '@material-ui/icons/TodayTwoTone'
import InfoTwoTone from '@material-ui/icons/InfoTwoTone'

// MATERIAL
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

// UTILS
import getActiveRoute from './utils/routes'

// HOC
import withStrings from 'hoc/lang'

// PROPS
interface SideBarProps {
	onClose: () => void
	open: boolean
}

const SideBar: React.FC<SideBarProps> = withStrings(({ $, open, onClose }) => {
	// ROUTER
	const router = useRouter()
	const path = router.asPath

	return (
		<>
			<div
				className={`${Styles.container} ${
					open ? Styles.openTabContainer : Styles.closedTabContainer
				}`}>
				<div className={Styles.brand}>
					<div className={Styles.logo}>
						<div className={Styles.icon}>
							<Image src='/assets/brand/icon.png' alt='Icon' height={45} width={45} />
						</div>
						<div>
							<h1>{$`Facilito©`}</h1>
							<p>{$`Todos los derechos reservados 2021`}</p>
						</div>
					</div>
					<div className={Styles.logoTablet}>
						<Image src='/assets/brand/logo.png' alt='Icon' height={45} width={85} />
					</div>
					<IconButton color='inherit' aria-label='info'>
						<InfoTwoTone />
					</IconButton>
				</div>
				<ul>
					<li>
						<Link href={ROUTES.forms}>
							<Button
								fullWidth
								variant='outlined'
								color={getActiveRoute(path, 'formularios') ? 'primary' : undefined}
								startIcon={<DescriptionTwoTone />}>{$`Formularios`}</Button>
						</Link>
					</li>
					<li>
						<Link href={ROUTES.orderTracking}>
							<Button
								fullWidth
								variant='outlined'
								color={getActiveRoute(path, 'tracking') ? 'primary' : undefined}
								startIcon={<ComputerTwoTone />}>{$`Order Tracking`}</Button>
						</Link>
					</li>
					<li>
						<Link href={ROUTES.products}>
							<Button
								fullWidth
								variant='outlined'
								color={getActiveRoute(path, 'productos') ? 'primary' : undefined}
								startIcon={<ShoppingCartTwoTone />}>{$`Productos`}</Button>
						</Link>
					</li>
					<li>
						<Link href={ROUTES.calendar}>
							<Button
								fullWidth
								variant='outlined'
								startIcon={<TodayTwoTone />}
								color={
									getActiveRoute(path, 'calendario') ? 'primary' : undefined
								}>{$`Calendario`}</Button>
						</Link>
					</li>
				</ul>
			</div>
			<div
				className={`${Styles.shadow} ${open ? Styles.openShadow : Styles.closedShadow}`}
				onClick={onClose}
			/>
		</>
	)
})

export default SideBar
