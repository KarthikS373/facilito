// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// NEXT
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Image from 'next/image'

// COMPONENTES
import ColorButton from 'components/button'
import Link from 'components/link'

// ICONS
import ShareLocationTwoToneIcon from '@mui/icons-material/ShareLocationTwoTone'
import ShoppingCartTwoTone from '@mui/icons-material/ShoppingCartTwoTone'
import ArrowForwardTwoTone from '@mui/icons-material/ArrowForwardTwoTone'
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone'
import ArrowBackTwoTone from '@mui/icons-material/ArrowBackTwoTone'
import TodayTwoTone from '@mui/icons-material/TodayTwoTone'

// MATERIAL
import IconButton from '@mui/material/IconButton'

// UTILS
import getActiveRoute from './utils/routes'

// HOC
import useStrings from 'hooks/lang'
import ROUTES from 'router/routes'

// PROPS
interface SideBarProps {
	onClose: () => void
	open: boolean
	setExpanded: SetState<boolean>
	expanded: boolean
}

const SideBar: React.FC<SideBarProps> = ({ open, onClose, setExpanded, expanded }) => {
	// ESTADO
	const collapse = () => setExpanded(!expanded)

	// STRINGS
	const { $ } = useStrings()

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
					{expanded && (
						<div className={Styles.logo}>
							<NextLink href={ROUTES.forms} passHref>
								<a title='Logo'>
									<Image
										unoptimized
										src='/assets/brand/logo.png'
										alt='Icon'
										height={45}
										width={85}
									/>
								</a>
							</NextLink>
						</div>
					)}
					<IconButton
						className={Styles.backBtn}
						onClick={collapse}
						color='inherit'
						aria-label='info'>
						{expanded ? <ArrowBackTwoTone /> : <ArrowForwardTwoTone />}
					</IconButton>
				</div>
				<ul>
					<li>
						<Link rKey='products' passHref>
							<ColorButton
								fullWidth
								onClick={onClose}
								variant='outlined'
								className={!expanded ? Styles.collapseLink : ''}
								$style={{
									borderColor: getActiveRoute(path, 'productos') ? 'var(--primary)' : undefined,
									color: getActiveRoute(path, 'productos') ? 'var(--primary)' : undefined,
								}}
								startIcon={<ShoppingCartTwoTone />}>
								{expanded ? $`Crear productos` : undefined}
							</ColorButton>
						</Link>
					</li>
					<li>
						<Link rKey='forms' passHref>
							<ColorButton
								fullWidth
								onClick={onClose}
								variant='outlined'
								className={!expanded ? Styles.collapseLink : ''}
								$style={{
									borderColor: getActiveRoute(path, 'tiendas') ? 'var(--primary)' : undefined,
									color: getActiveRoute(path, 'tiendas') ? 'var(--primary)' : undefined,
								}}
								startIcon={<StorefrontTwoToneIcon />}>
								{expanded ? $`Crear tienda` : undefined}
							</ColorButton>
						</Link>
					</li>
					<li>
						<Link rKey='tracking' passHref>
							<ColorButton
								fullWidth
								onClick={onClose}
								variant='outlined'
								className={!expanded ? Styles.collapseLink : ''}
								$style={{
									borderColor: getActiveRoute(path, 'tracking') ? 'var(--primary)' : undefined,
									color: getActiveRoute(path, 'tracking') ? 'var(--primary)' : undefined,
								}}
								startIcon={<ShareLocationTwoToneIcon />}>
								{expanded ? $`Configurar tracking` : ''}
							</ColorButton>
						</Link>
					</li>

					<li>
						<Link rKey='calendar' passHref>
							<ColorButton
								fullWidth
								onClick={onClose}
								variant='outlined'
								startIcon={<TodayTwoTone />}
								className={!expanded ? Styles.collapseLink : ''}
								$style={{
									borderColor: getActiveRoute(path, 'calendario') ? 'var(--primary)' : undefined,
									color: getActiveRoute(path, 'calendario') ? 'var(--primary)' : undefined,
								}}>
								{expanded ? $`Ver citas` : ''}
							</ColorButton>
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
}

export default SideBar
