// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// PROPS
interface TabInfoProps {
	children?: React.ReactNode
	fullWidth?: boolean
	title: string
	body: string
}
const TabInfo: React.FC<TabInfoProps> = ({ title, body, children, fullWidth }) => {
	return (
		<div className={Styles.info}>
			<div className={`${Styles.text}${fullWidth ? Styles.textFullWidth : ''}`}>
				<h3>{title}</h3>
				<p>{body}</p>
			</div>
			{children}
		</div>
	)
}

export default TabInfo
