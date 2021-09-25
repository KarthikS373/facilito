// REACT
import React, { useState, MouseEvent, useContext } from 'react'

// NEXT
import Image from 'next/image'

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
import TranslateTwoTone from '@mui/icons-material/TranslateTwoTone'
import PersonTwoTone from '@mui/icons-material/PersonTwoTone'
import MoneyTwoTone from '@mui/icons-material/MoneyTwoTone'
import MenuTwoTone from '@mui/icons-material/MenuTwoTone'
import MoreVert from '@mui/icons-material/MoreVert'

// COMPONENTES
import AccountMenu from './components/accountMenu'
import BadgeMenu from './components/badgeMenu'
import SideBar from './components/sideBar'
import Search from './components/search'

// CONTEXTOS
import BusinessContext from 'context/business'
import UserContext from 'context/user'

// HOC
import useStrings from 'hooks/lang'

// PROPIEDADES
interface CustomAppBarProps {
	showSearchBar: boolean
}

const Topbar: React.FC<CustomAppBarProps> = ({ showSearchBar }) => {
	// STRINGS
	const { $ } = useStrings()

	// EMPRESA
	const businessCtx = useContext(BusinessContext)

	// USUARIO
	const userCtx = useContext(UserContext)

	// BADGE
	const [badgeAnchor, setBadgeAnchor] = useState<HTMLElement | null>(null)
	const openBadge = Boolean(badgeAnchor)

	// DRAWER
	const [openDrawer, setOpenDrawer] = useState<boolean>(false)

	// MENU DE CUENTA
	const [accountMenu, setAccountMenu] = useState<HTMLElement | null>(null)
	const openAccountMenu = Boolean(accountMenu)

	// CERRAR MENU DE CUENTA
	const closeAccountMenu = () => setAccountMenu(null)

	// ABRIR SIDE
	const handleDrawer = (open: boolean) => () => setOpenDrawer(open)

	// ABRIR/CERRAR BADGE MENU
	const openBadgeMenu = (ev: MouseEvent<HTMLElement>) => setBadgeAnchor(ev.currentTarget)
	const closeBadgeMenu = () => setBadgeAnchor(null)

	// ABRIR MENU
	const openAccountMenuEv = (ev: MouseEvent<HTMLButtonElement>) => setAccountMenu(ev.currentTarget)

	// CAMBIAR LENGUAJE
	const changeLangCode = (newLangCode: 'es' | 'en') => () =>
		businessCtx.setBusinessDB({ lang: newLangCode })

	return (
		<>
			{/* DRAWER PRINCIPAL */}
			<SideBar onClose={handleDrawer(false)} open={openDrawer} />

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
						startIcon={<MoneyTwoTone />}
						onClick={openBadgeMenu}>
						<span>{businessCtx.business?.badge}</span>
					</Button>

					{/* LENGUAJE */}
					<Button
						variant='outlined'
						aria-label='langCode'
						startIcon={<TranslateTwoTone />}
						onClick={changeLangCode(businessCtx.business?.lang === 'es' ? 'en' : 'es')}>
						{businessCtx.business?.lang === 'es' ? $`Español` : $`English`}
					</Button>

					{/* NOTIFICACIONES */}
					<IconButton color='inherit' aria-label='notifications'>
						<Badge badgeContent={0} color='secondary'>
							<NotificationsTwoTone />
						</Badge>
					</IconButton>

					{/* CUENTA */}
					<Button
						variant='outlined'
						aria-label='account'
						onClick={openAccountMenuEv}
						endIcon={<MoreVert />}
						startIcon={
							<div className={Styles.accountPic}>
								{userCtx.user?.picture ? (
									<Image
										unoptimized
										src={userCtx.user?.picture}
										alt='UserPic'
										height={30}
										width={30}
									/>
								) : (
									<PersonTwoTone />
								)}
							</div>
						}>
						<div className={Styles.accountBtnContent}>
							<span>{userCtx.user?.name.split(' ')[0]?.toUpperCase()}</span>
							<span>{userCtx.user?.role}</span>
						</div>
					</Button>
				</Toolbar>

				{/* MENU DE CUENTA */}
				<AccountMenu onClose={closeAccountMenu} open={openAccountMenu} anchorEl={accountMenu} />

				{/* MENU DE MONEDA */}
				<BadgeMenu onClose={closeBadgeMenu} open={openBadge} anchorEl={badgeAnchor} />
			</AppBar>
		</>
	)
}

export default Topbar
