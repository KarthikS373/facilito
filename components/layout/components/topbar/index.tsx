// REACT
import React, { useState, MouseEvent, useCallback, useContext } from 'react'

// ROUTER
import { useRouter } from 'next/router'

// NEXT
import Image from 'next/image'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'

// ICONOS
import NotificationsTwoTone from '@material-ui/icons/NotificationsTwoTone'
import TranslateTwoTone from '@material-ui/icons/TranslateTwoTone'
import SearchTwoTone from '@material-ui/icons/SearchTwoTone'
import PersonTwoTone from '@material-ui/icons/PersonTwoTone'
import MoneyTwoTone from '@material-ui/icons/MoneyTwoTone'
import MenuTwoTone from '@material-ui/icons/MenuTwoTone'
import MoreVert from '@material-ui/icons/MoreVert'

// COMPONENTES
import NotificationsMenu from './components/notificationsMenu'
import AccountMenu from './components/accountMenu'
import SideBar from './components/sideBar'

// HOOKS
import { useNotifications } from './utils/hooks'

// HELPERS
import { closeSnack, resetNotificationsMenu, saveNotify, evaluatePath } from './utils/tools'

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

const Topbar: React.FC<CustomAppBarProps> = withStrings(({ showSearchBar, $ }) => {
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
	const handleDrawer = (open: boolean) => () => setOpenDrawer(open)

	// ABRIR/CERRAR BADGE MENU
	const openBadgeMenu = (ev: MouseEvent<HTMLElement>) => setBadgeAnchor(ev.currentTarget)
	const closeBadgeMenu = () => setBadgeAnchor(null)

	// ABRIR MENU
	const openAccountMenuEv = (ev: MouseEvent<HTMLButtonElement>) => setAccountMenu(ev.currentTarget)

	// ABRIR MENU DE NOTIFICACIONES
	const openNotificationsMenuEv = (ev: MouseEvent<HTMLButtonElement>) =>
		setNotificationsMenu(ev.currentTarget)

	// CAMBIAR LENGUAJE
	const changeLangCode = (newLangCode: 'es' | 'en') => () =>
		businessCtx.setBusinessDB({ lang: newLangCode })

	// CERRAR SNACK
	const handleClose = closeSnack(setOpenSnack)

	// GUARDAR NOTIFICACIONES
	const saveNotifications = useCallback(saveNotify(setNotificationList, setOpenSnack), [])

	// HOOK DE NOTIFICACIONES
	useNotifications(saveNotifications, businessCtx.business?.id)

	// RUTAS
	const showAppbarSearch: boolean = evaluatePath(path)

	if (showAppbarSearch)
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
						{showSearchBar && (
							<TextField
								fullWidth
								variant='outlined'
								className={Styles.search}
								placeholder={$`Buscar formularios, productos, eventos y ordenes en facilito`}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<SearchTwoTone />
										</InputAdornment>
									),
								}}
							/>
						)}

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
	else return <></>
})

export default Topbar
