// REACT
import React, { useState, MouseEvent, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'

// ICONOS
import NotificationsTwoTone from '@mui/icons-material/NotificationsTwoTone'
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone'
import TranslateTwoTone from '@mui/icons-material/TranslateTwoTone'
import MenuTwoTone from '@mui/icons-material/MenuTwoTone'

// COMPONENTES
import AccountButton from './components/accountButton'
import BadgeMenu from './components/badgeMenu'
import SideBar from './components/sideBar'
import Search from './components/search'

// CONTEXTOS
import BusinessContext from 'context/business'

// HOC
import useStrings from 'hooks/lang'

// PROPIEDADES
interface CustomAppBarProps {
	showSearchBar: boolean
	setExpanded: SetState<boolean>
	expanded: boolean
}

const Topbar: React.FC<CustomAppBarProps> = ({ showSearchBar, setExpanded, expanded }) => {
	// STRINGS
	const { $ } = useStrings()

	// EMPRESA
	const businessCtx = useContext(BusinessContext)

	// BADGE
	const [badgeAnchor, setBadgeAnchor] = useState<HTMLElement | null>(null)
	const openBadge = Boolean(badgeAnchor)

	// DRAWER
	const [openDrawer, setOpenDrawer] = useState<boolean>(false)

	// ABRIR SIDE
	const handleDrawer = (open: boolean) => () => setOpenDrawer(open)

	// ABRIR/CERRAR BADGE MENU
	const openBadgeMenu = (ev: MouseEvent<HTMLElement>) => setBadgeAnchor(ev.currentTarget)
	const closeBadgeMenu = () => setBadgeAnchor(null)

	// CAMBIAR LENGUAJE
	const changeLangCode = (newLangCode: 'es' | 'en') => () =>
		businessCtx.setBusinessDB({ lang: newLangCode })

	return (
		<>
			{/* DRAWER PRINCIPAL */}
			<SideBar
				setExpanded={setExpanded}
				expanded={expanded}
				onClose={handleDrawer(false)}
				open={openDrawer}
			/>

			<AppBar position='static' className={Styles.container}>
				<Toolbar>
					{/* MENU */}
					<IconButton
						color='inherit'
						aria-label='menu'
						className={Styles.menuBtn}
						onClick={handleDrawer(true)}>
						<MenuTwoTone />
					</IconButton>

					{/* BUSCADOR */}
					{showSearchBar && <Search />}

					{/* MONEDA */}
					<Button
						aria-label='badge'
						variant='outlined'
						className={Styles.badgeBtn}
						startIcon={<PaymentsTwoToneIcon />}
						onClick={openBadgeMenu}>
						<span>{businessCtx.business?.badge ?? 'GTQ'}</span>
					</Button>

					{/* LENGUAJE */}
					<Button
						variant='outlined'
						aria-label='langCode'
						startIcon={<TranslateTwoTone />}
						onClick={changeLangCode(businessCtx.business?.lang === 'es' ? 'en' : 'es')}>
						{businessCtx.business
							? businessCtx.business?.lang === 'es'
								? $`Español`
								: $`English`
							: $`Español`}
					</Button>

					{/* NOTIFICACIONES */}
					<IconButton color='inherit' aria-label='notifications'>
						<Badge badgeContent={0} color='secondary'>
							<NotificationsTwoTone />
						</Badge>
					</IconButton>

					{/* CUENTA */}
					<AccountButton />
				</Toolbar>

				{/* MENU DE MONEDA */}
				<BadgeMenu onClose={closeBadgeMenu} open={openBadge} anchorEl={badgeAnchor} />
			</AppBar>
		</>
	)
}

export default Topbar
