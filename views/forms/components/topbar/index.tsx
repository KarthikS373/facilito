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
import { Menu as MuiMenu } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Badge from '@material-ui/core/Badge'
import List from '@material-ui/core/List'

// ICONOS
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined'
import InputBase from '@material-ui/core/InputBase'
import Search from '@material-ui/icons/Search'
import Person from '@material-ui/icons/Person'
import Menu from '@material-ui/icons/Menu'

// COMPONENTES
import NotificationsMenu from './components/notificationsMenu'
import AccountMenu from './components/accountMenu'

// RUTAS
import ROUTES from 'router/routes'

// HOOKS
import { useNotifications } from 'hooks/business'

// HELPERS
import {
	badgeList,
	badgePrefix,
	closeSnack,
	resetNotificationsMenu,
	saveNotify,
} from './utils/tools'
import { drawerIcons } from './utils/icons'

// CONTEXTOS
import BusinessContext from 'context/business'
import UserContext from 'context/user'

// HOC
import withStrings from 'hoc/lang'

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

		// CAMBIAR MONEDA
		const changeBadge = (badge: string) => () => {
			businessCtx && businessCtx.setBadge(badge.replace('QGTQ', 'GTQ'))
			setBadgeAnchor(null)
		}

		// CERRAR SNACK
		const handleClose = closeSnack(setOpenSnack)

		// GUARDAR NOTIFICACIONES
		const saveNotifications = useCallback(saveNotify(setNotificationList, setOpenSnack), [])

		// HOOK DE NOTIFICACIONES
		useNotifications(saveNotifications, businessCtx.business?.id)

		// CERRAR
		const toggleDrawer = () => setOpenDrawer(false)

		// RUTAS
		const routes: string[] = [$`Formularios`, $`Productos`, $`Calendario`, $`Order Tracking`]

		return (
			<>
				<AppBar position='static' className={Styles.container}>
					<Toolbar>
						{/* LOGO */}
						<div className={Styles.brand}>
							<IconButton
								edge='start'
								className={Styles.menuButton}
								onClick={openDrawerEv}
								color='inherit'
								aria-label='drawer'>
								<Menu />
							</IconButton>
							<Image
								height={50}
								width={100}
								src='/assets/brand/logo.png'
								alt='Logo'
								onClick={goToHome}
							/>
						</div>

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
							<IconButton aria-label='badge' className={Styles.badge} onClick={openBadgeMenu}>
								{businessCtx?.badge}
							</IconButton>

							{/* LENGUAJE */}
							<IconButton
								aria-label='langCode'
								className={Styles.langCode}
								onClick={changeLangCode(langCode === 'es' ? 'en' : 'es')}>
								<Image
									width={30}
									height={30}
									src={langCode === 'es' ? '/assets/icons/es.png' : '/assets/icons/us.png'}
									alt='Flag'
								/>
							</IconButton>

							{/* NOTIFICACIONES */}
							<IconButton
								aria-label='notifications'
								color='inherit'
								onClick={openNotificationsMenuEv}>
								<Badge badgeContent={notificationList.length || 0} color='secondary'>
									<NotificationsOutlined />
								</Badge>
							</IconButton>

							{/* CUENTA */}
							<IconButton
								edge='end'
								aria-label='account'
								aria-haspopup='true'
								onClick={openAccountMenuEv}>
								{userCtx.user?.picture ? (
									<img src={userCtx.user?.picture} alt='UserPic' />
								) : (
									<Person />
								)}
							</IconButton>
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

				{/* MENU DE MONEDA */}
				<MuiMenu
					id='badge-menu'
					anchorEl={badgeAnchor}
					keepMounted
					open={Boolean(badgeAnchor)}
					onClose={closeBadgeMenu}>
					{badgeList.map((cBadge: string, key: number) => (
						<MenuItem key={`badge_${key}`} onClick={changeBadge(`${cBadge}${badgePrefix[key]} `)}>
							<strong style={{ marginRight: '5px' }}>{cBadge}</strong>
							{badgePrefix[key]}
						</MenuItem>
					))}
				</MuiMenu>

				{/* DRAWER PRINCIPAL */}
				<Drawer anchor='left' open={openDrawer} onClose={toggleDrawer}>
					<div className={Styles.drawer}>
						<Image src='/assets/brand/logo.png' height={50} width={100} alt='Brand' />
						<List onClick={toggleDrawer}>
							{routes.map((route: string, index: number) => (
								<Link href={route.toLowerCase()} key={route}>
									<ListItem
										className={
											path.includes(route.toLowerCase())
												? `${Styles.listItem} ${Styles.activeRoute}`
												: Styles.listItem
										}
										button>
										<ListItemText primary={route} />
										<ListItemIcon>{drawerIcons[index]}</ListItemIcon>
									</ListItem>
								</Link>
							))}
						</List>
					</div>
				</Drawer>
			</>
		)
	}
)

export default Topbar
