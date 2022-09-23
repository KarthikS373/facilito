// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

interface SideBarProps {
	open: boolean
	width?: number
	onClose: () => unknown
	children: React.ReactNode
}
const SideBar: React.FC<SideBarProps> = ({ open, width, onClose, children }) => {
	return (
		<>
			<div
				style={{ width: `${width}px` }}
				className={`${Styles.container} ${open ? Styles.openContent : Styles.closedContent}`}>
				{children}
			</div>
			<div
				onClick={onClose}
				className={`${Styles.shadow} ${open ? Styles.openShadow : Styles.closedShadow}`}
			/>
		</>
	)
}

SideBar.defaultProps = {
	width: 300,
}

export default SideBar
