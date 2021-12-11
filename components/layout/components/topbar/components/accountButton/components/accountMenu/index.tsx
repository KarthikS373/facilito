// REACT
import React from 'react'

// MATERIAL
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// ICONOS
import ExitToAppTwoTone from '@mui/icons-material/ExitToAppTwoTone'
import SettingsTwoTone from '@mui/icons-material/SettingsTwoTone'

// UTILS
import logoutEvent from './tools'

// ROUTER
import { useRouter } from 'next/router'
import ROUTES from 'router/routes'

// STRINGS
import useStrings from 'hooks/lang'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'

// PROPS
interface AccountMenuProps {
	anchorEl: HTMLElement | null
	disablePortal: boolean
	onClose: EmptyFunction
	open: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({ disablePortal, anchorEl, onClose, open }) => {
	// STRINGS
	const { $ } = useStrings()

	// HISTORY
	const router = useRouter()

	// CERRAR SESIÓN
	const logout = () => logoutEvent(onClose, router)

	// IR SETTINGS
	const goToSettings = () => {
		router.push(ROUTES.edit)
		onClose()
	}

	return (
		<PopperMenuList
			open={open}
			onClose={onClose}
			anchorEl={anchorEl}
			disablePortal={disablePortal}
			placement='bottom-end'>
			<MenuItem onClick={goToSettings}>
				<Button variant='outlined' fullWidth startIcon={<SettingsTwoTone />}>
					{$`Ajustes`}
				</Button>
			</MenuItem>
			<MenuItem onClick={logout}>
				<Button variant='outlined' fullWidth startIcon={<ExitToAppTwoTone />}>
					{$`Salir`}
				</Button>
			</MenuItem>
		</PopperMenuList>
	)
}

export default AccountMenu
