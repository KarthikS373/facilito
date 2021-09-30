// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// NEXT
import { useRouter } from 'next/router'
import Image from 'next/image'

// COMPONENTES
import ColorButton from 'components/button'
import Link from 'components/link'

// ICONS
import ShoppingCartTwoTone from '@mui/icons-material/ShoppingCartTwoTone'
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone'
import ComputerTwoTone from '@mui/icons-material/ComputerTwoTone'
import TodayTwoTone from '@mui/icons-material/TodayTwoTone'
import InfoTwoTone from '@mui/icons-material/InfoTwoTone'

// MATERIAL
import IconButton from '@mui/material/IconButton'

// UTILS
import getActiveRoute from './utils/routes'

// HOC
import useStrings from 'hooks/lang'

// PROPS
interface SideBarProps {
	onClose: () => void
	open: boolean
}

const SideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
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
					<div className={Styles.logo}>
						<Image unoptimized src='/assets/brand/logo.png' alt='Icon' height={45} width={85} />
					</div>
					<IconButton color='inherit' aria-label='info'>
						<InfoTwoTone />
					</IconButton>
				</div>
				<ul>
					<li>
						<Link rKey='forms' passHref>
							<ColorButton
								fullWidth
								onClick={onClose}
								variant='outlined'
								$style={{
									borderColor: getActiveRoute(path, 'formularios') ? 'var(--primary)' : undefined,
									color: getActiveRoute(path, 'formularios') ? 'var(--primary)' : undefined,
								}}
								startIcon={<DescriptionTwoTone />}>{$`Formularios`}</ColorButton>
						</Link>
					</li>
					<li>
						<Link rKey='tracking' passHref>
							<ColorButton
								fullWidth
								onClick={onClose}
								variant='outlined'
								$style={{
									borderColor: getActiveRoute(path, 'tracking') ? 'var(--primary)' : undefined,

									color: getActiveRoute(path, 'tracking') ? 'var(--primary)' : undefined,
								}}
								startIcon={<ComputerTwoTone />}>{$`Tracking`}</ColorButton>
						</Link>
					</li>
					<li>
						<Link rKey='products' passHref>
							<ColorButton
								fullWidth
								onClick={onClose}
								variant='outlined'
								$style={{
									borderColor: getActiveRoute(path, 'productos') ? 'var(--primary)' : undefined,
									color: getActiveRoute(path, 'productos') ? 'var(--primary)' : undefined,
								}}
								startIcon={<ShoppingCartTwoTone />}>{$`Productos`}</ColorButton>
						</Link>
					</li>
					<li>
						<Link rKey='calendar' passHref>
							<ColorButton
								fullWidth
								onClick={onClose}
								variant='outlined'
								startIcon={<TodayTwoTone />}
								$style={{
									borderColor: getActiveRoute(path, 'calendario') ? 'var(--primary)' : undefined,
									color: getActiveRoute(path, 'calendario') ? 'var(--primary)' : undefined,
								}}>{$`Calendario`}</ColorButton>
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
