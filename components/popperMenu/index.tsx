import React from 'react'

// MATERIAL
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuList from '@material-ui/core/MenuList'
import Popper, { PopperProps } from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'

interface PopperMenuProps extends PopperProps {
	onClose: EmptyFunction
}
const PopperMenuList: React.FC<PopperMenuProps> = (props) => {
	// CERRAR
	const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
		// @ts-ignore
		if (props.anchorEl && props.anchorEl.contains(event.target as HTMLElement)) return
		props.onClose()
	}

	// TAB
	const handleListKeyDown = (event) => {
		if (event.key === 'Tab') {
			event.preventDefault()
			props.onClose()
		}
	}

	// SIN CLOSE
	const popperProps = { ...props }
	delete popperProps.onClose

	return (
		<Popper role={undefined} transition disablePortal {...popperProps}>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList
								autoFocusItem={props.open}
								id='menu-list-grow'
								onKeyDown={handleListKeyDown}>
								{props.children}
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	)
}

export default PopperMenuList
