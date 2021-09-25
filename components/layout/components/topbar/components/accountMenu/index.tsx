// REACT
import React from 'react'

// MATERIAL
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// ICONOS
import ExitToAppTwoTone from '@mui/icons-material/ExitToAppTwoTone'
import SettingsTwoTone from '@mui/icons-material/SettingsTwoTone'

// UTILS
import { logout } from 'utils/auth'

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
	onClose: EmptyFunction
	open: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({ anchorEl, onClose, open }) => {
	// STRINGS
	const { $ } = useStrings()

	// HISTORY
	const router = useRouter()

	// CERRAR SESIÓN
	const logoutEv = () => {
		logout().then(() => router.push(ROUTES.login))
		onClose()
	}

	// IR SETTINGS
	const goToSettings = () => {
		router.push(ROUTES.edit)
		onClose()
	}

	return (
		<PopperMenuList anchorEl={anchorEl} onClose={onClose} open={open} placement='bottom-end'>
			<MenuItem onClick={logoutEv}>
				<Button variant='outlined' fullWidth startIcon={<ExitToAppTwoTone />}>
					{$`Cerrar sesión`}
				</Button>
			</MenuItem>

			<MenuItem onClick={goToSettings}>
				<Button variant='outlined' fullWidth startIcon={<SettingsTwoTone />}>
					{$`Configuraciones`}
				</Button>
			</MenuItem>
		</PopperMenuList>
	)
}

export default AccountMenu
