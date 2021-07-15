// REACT
import React from 'react'

// MATERIAL
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

// ICONOS
import ExitToApp from '@material-ui/icons/ExitToApp'
import Settings from '@material-ui/icons/Settings'

// UTILS
import { logout } from 'utils/auth'

// ROUTER
import { useRouter } from 'next/router'
import ROUTES from 'router/routes'
import withStrings from 'hoc/lang'

// PROPS
interface AccountMenuProps {
	anchorEl: HTMLElement | null
	onClose: EmptyFunction
	open: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = withStrings<AccountMenuProps>(
	({ $, anchorEl, onClose, open }) => {
		// HISTORY
		const router = useRouter()

		// CERRAR SESIÓN
		const logoutEv = () => {
			logout().then(() => router.push('/cuenta'))
			onClose()
		}

		// IR SETTINGS
		const goToSettings = () => {
			router.push(ROUTES.edit)
			onClose()
		}

		return (
			<Menu keepMounted open={open} id='account-menu' onClose={onClose} anchorEl={anchorEl}>
				<MenuItem onClick={goToSettings}>
					<Settings style={{ marginRight: '10px' }} />
					{$`Cerrar sesión`}
				</MenuItem>
				<MenuItem onClick={logoutEv}>
					<ExitToApp style={{ marginRight: '10px' }} />
					{$`Configuraciones`}
				</MenuItem>
			</Menu>
		)
	}
)

export default AccountMenu
