// REACT
import React, { useState, MouseEvent, useCallback, useContext } from 'react'

// ROUTER
import { useRouter } from 'next/router'
import Link from 'next/link'

// NEXT
import Image from 'next/image'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import ListItem from '@material-ui/core/ListItem'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import List from '@material-ui/core/List'

// ICONOS
import NotificationsTwoTone from '@material-ui/icons/NotificationsTwoTone'
import TranslateTwoTone from '@material-ui/icons/TranslateTwoTone'
import MoneyTwoTone from '@material-ui/icons/MoneyTwoTone'
import InputBase from '@material-ui/core/InputBase'
import MoreVert from '@material-ui/icons/MoreVert'
import Search from '@material-ui/icons/Search'
import Person from '@material-ui/icons/Person'

// COMPONENTES
import NotificationsMenu from './components/notificationsMenu'
import AccountMenu from './components/accountMenu'
import SideBar from './components/sideBar'

// RUTAS
import ROUTES from 'router/routes'

// HOOKS
import { useNotifications } from 'hooks/business'

// HELPERS
import { closeSnack, resetNotificationsMenu, saveNotify } from './utils/tools'
import { drawerIcons } from './utils/icons'

// CONTEXTOS
import BusinessContext from 'context/business'
import UserContext from 'context/user'

// HOC
import withStrings from 'hoc/lang'
import BadgeMenu from './components/badgeMenu'

// PROPIEDADES
interface CustomAppBarProps {
	showSearchBar: boolean
}

const Topbar: React.FC<CustomAppBarProps> = withStrings(
	({ showSearchBar, $, langCode, setLangCode }) => {
		// EMPRESA
		const businessCtx = useContext(BusinessContext)

		// USUARIO
		const userCtx = useContext(UserContext)

		// HISTORIAL
		const router = useRouter()
		const path = router.asPath

		// ESTADO
		const [notificationList, setNotificationList] = useState<FormNotification[]>([])

		// BADGE
		const [badgeAnchor, setBadgeAnchor] = useState<HTMLElement | null>(null)
		const openBadge = Boolean(badgeAnchor)

		// DRAWER
		const [openDrawer, setOpenDrawer] = useState<boolean>(false)

		// SNACKS
		const [openSnack, setOpenSnack] = useState<boolean>(false)

		// MENU DE CUENTA
		const [accountMenu, setAccountMenu] = useState<HTMLElement | null>(null)
		const openAccountMenu = Boolean(accountMenu)

		// MENU DE NOTIFICACIÓN
		const [notificationsMenu, setNotificationsMenu] = useState<HTMLElement | null>(null)
		const openNotificationsMenu = Boolean(notificationsMenu)

		// CERRAR MENU DE CUENTA
		const closeAccountMenu = () => setAccountMenu(null)

		// CERRAR MENU DE NOTIFICACIONES
		const closeNotificationsMenu = () =>
			resetNotificationsMenu(setNotificationList, setNotificationsMenu)

		// ABRIR SIDE
		const openDrawerEv = () => setOpenDrawer(true)

		// ABRIR/CERRAR BADGE MENU
		const openBadgeMenu = (ev: MouseEvent<HTMLElement>) => setBadgeAnchor(ev.currentTarget)
		const closeBadgeMenu = () => setBadgeAnchor(null)

		// ABRIR MENU
		const openAccountMenuEv = (ev: MouseEvent<HTMLButtonElement>) =>
			setAccountMenu(ev.currentTarget)

		// ABRIR MENU DE NOTIFICACIONES
		const openNotificationsMenuEv = (ev: MouseEvent<HTMLButtonElement>) =>
			setNotificationsMenu(ev.currentTarget)

		// ENVIAR A HOME
		const goToHome = () => router.push(ROUTES.forms)

		// CAMBIAR LENGUAJE
		const changeLangCode = (newLangCode: 'es' | 'en') => () => setLangCode(newLangCode)

		// CERRAR SNACK
		const handleClose = closeSnack(setOpenSnack)

		// GUARDAR NOTIFICACIONES
		const saveNotifications = useCallback(saveNotify(setNotificationList, setOpenSnack), [])

		// HOOK DE NOTIFICACIONES
		useNotifications(saveNotifications, businessCtx.business?.id)

		// CERRAR
		const toggleDrawer = () => setOpenDrawer(!openDrawer)

		// RUTAS
		const routes: string[] = [$`Formularios`, $`Productos`, $`Calendario`, $`Order Tracking`]

		return (
			<>
				{/* DRAWER PRINCIPAL */}
				<SideBar/>

				<AppBar position='static' className={Styles.container}>
					<Toolbar>
						{/* BUSCADOR */}
						{showSearchBar && (
							<div className={Styles.search}>
								<div className={Styles.searchIcon}>
									<Search />
								</div>
								<InputBase
									placeholder={$`Buscar en facilito`}
									type='search'
									className={Styles.searchInp}
									inputProps={{ 'aria-label': 'search' }}
								/>
							</div>
						)}

						<div className={Styles.actions}>
							{/* MONEDA */}
							<Button
								aria-label='badge'
								variant='outlined'
								className={Styles.badgeBtn}
								startIcon={<MoneyTwoTone />}
								onClick={openBadgeMenu}>
								<span>{businessCtx?.badge}</span>
							</Button>

							{/* LENGUAJE */}
							<Button
								variant='outlined'
								aria-label='langCode'
								startIcon={<TranslateTwoTone />}
								onClick={changeLangCode(langCode === 'es' ? 'en' : 'es')}>
								{langCode === 'es' ? $`Español` : $`English`}
							</Button>

							{/* NOTIFICACIONES */}
							<IconButton
								color='inherit'
								aria-label='notifications'
								onClick={openNotificationsMenuEv}>
								<Badge badgeContent={notificationList.length || 0} color='secondary'>
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
											<Image src={userCtx.user?.picture} alt='UserPic' height={30} width={30} />
										) : (
											<Person />
										)}
									</div>
								}>
								<div className={Styles.accountBtnContent}>
									<span>@{businessCtx.business?.url}</span>
									<span>{businessCtx.business?.category}</span>
								</div>
							</Button>
						</div>
					</Toolbar>

					{/* MENU DE CUENTA */}
					<AccountMenu onClose={closeAccountMenu} open={openAccountMenu} anchorEl={accountMenu} />

					{/* MENU DE NOTIFICACIONES */}
					<NotificationsMenu
						notifications={notificationList}
						onClose={closeNotificationsMenu}
						open={openNotificationsMenu}
						anchorEl={notificationsMenu}
					/>

					{/* MENU DE MONEDA */}
					<BadgeMenu onClose={closeBadgeMenu} open={openBadge} anchorEl={badgeAnchor} />
				</AppBar>

				{/* ALERTAS */}
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					className={Styles.snack}
					open={openSnack}
					autoHideDuration={6000}
					onClose={handleClose}
					message={notificationList[0]?.body}
				/>
			</>
		)
	}
)

export default Topbar
