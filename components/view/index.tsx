// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

const View: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	return <div className={Styles.container}>{children}</div>
}

export default View
