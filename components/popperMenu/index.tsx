/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'

// MATERIAL
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Popper, { PopperProps } from '@mui/material/Popper'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'

interface PopperMenuProps extends PopperProps {
	onClose: EmptyFunction
}
const PopperMenuList: React.FC<PopperMenuProps> = (props) => {
	const handleClose = (event: Event | React.SyntheticEvent) => {
		const anchorEl = props.anchorEl as HTMLElement
		if (anchorEl && 'contains' in anchorEl && anchorEl.contains(event.target as HTMLElement)) {
			return
		}

		props.onClose()
	}

	// TAB
	const handleListKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Tab') {
			event.preventDefault()
			props.onClose()
		} else if (event.key === 'Escape') {
			props.onClose()
		}
	}

	// SIN CLOSE
	const popperProps = { ...props }
	// @ts-ignore
	delete popperProps.onClose

	return (
		<Popper {...popperProps} disablePortal role={undefined}>
			<Paper>
				<ClickAwayListener onClickAway={handleClose}>
					<MenuList onKeyDown={handleListKeyDown} autoFocusItem={popperProps.open}>
						{props.children}
					</MenuList>
				</ClickAwayListener>
			</Paper>
		</Popper>
	)
}

export default PopperMenuList
