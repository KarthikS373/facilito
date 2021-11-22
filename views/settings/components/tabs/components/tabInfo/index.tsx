// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// PROPS
interface TabInfoProps {
	title: string
	body: string
}
const TabInfo: React.FC<TabInfoProps> = ({ title, body, children }) => {
	return (
		<div className={Styles.info}>
			<div className={Styles.text}>
				<h3>{title}</h3>
				<p>{body}</p>
			</div>
			{children}
		</div>
	)
}

export default TabInfo
