// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

interface InfoProps {
	title: string
	description: string
	icon: JSX.Element
	children: React.ReactNode
}
const PageInfo: React.FC<InfoProps> = ({ title, description, icon, children }) => {
	return (
		<div className={Styles.container}>
			<div className={Styles.info}>
				{icon}
				<div className={Styles.text}>
					<h2>{title}</h2>
					<p>{description}</p>
				</div>
			</div>
			<div className={Styles.actions}>{children}</div>
		</div>
	)
}

export default PageInfo
