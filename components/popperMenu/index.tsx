import React from 'react'

// MATERIAL
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper, { PopperProps } from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Zoom from '@material-ui/core/Zoom'

interface PopperMenuProps extends PopperProps {
	onClose: EmptyFunction
}
const PopperMenuList: React.FC<PopperMenuProps> = (props) => {
	// CERRAR
	const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
		const anchorEl = props.anchorEl as HTMLElement
		if (anchorEl && anchorEl.contains(event.target as HTMLElement)) return
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
			{({ TransitionProps, placement }) => {
				const posPlacement: string[] = placement.split('-')
				const yPlacement: string = { bottom: 'top', top: 'bottom' }[posPlacement[0]]
				const xPlacement: string = { end: 'right', start: 'left', def: 'center' }[
					posPlacement[1] || 'def'
				]

				return (
					<Zoom {...TransitionProps} style={{ transformOrigin: `${xPlacement} ${yPlacement}` }}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id='menu-list-grow' autoFocusItem={false} onKeyDown={handleListKeyDown}>
									{props.children}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Zoom>
				)
			}}
		</Popper>
	)
}

export default PopperMenuList
