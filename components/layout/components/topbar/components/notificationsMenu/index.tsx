// REACT
import React from 'react'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import MenuItem from '@mui/material/MenuItem'

// PROPS
interface AccountMenuProps {
	notifications: FormNotification[]
	anchorEl: HTMLElement | null
	onClose: EmptyFunction
	open: boolean
}

const NotificationsMenu: React.FC<AccountMenuProps> = ({
	anchorEl,
	notifications,
	onClose,
	open,
}: AccountMenuProps) => {
	return (
		<PopperMenuList anchorEl={anchorEl} onClose={onClose} open={open} placement='bottom-end'>
			{notifications.map((notification: FormNotification, key: number) => (
				<MenuItem className={Styles.item} key={`notification_${key}`} onClick={onClose}>
					<strong>{notification.title}</strong>
					<p>{notification.body}</p>
				</MenuItem>
			))}
		</PopperMenuList>
	)
}

export default NotificationsMenu
