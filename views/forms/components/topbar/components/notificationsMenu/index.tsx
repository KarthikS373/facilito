// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'

// PROPS
interface AccountMenuProps {
	notifications: FormNotification[]
	anchorEl: HTMLElement | null
	onClose: EmptyFunction
	open: boolean
}

const NotificationsMenu: React.FC<AccountMenuProps> = (props: AccountMenuProps) => {
	return (
		<Popper
			open={props.open}
			anchorEl={props.anchorEl}
			role={undefined}
			transition
			disablePortal
			className={Styles.container}>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}>
					<Paper>
						<ClickAwayListener onClickAway={props.onClose}>
							<MenuList autoFocusItem={props.open} id='menu-list-grow'>
								{props.notifications.map((notification: FormNotification, key: number) => (
									<MenuItem
										className={Styles.item}
										key={`notification_${key}`}
										onClick={props.onClose}>
										<strong>{notification.title}</strong>
										<p>{notification.body}</p>
									</MenuItem>
								))}
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	)
}

export default NotificationsMenu
