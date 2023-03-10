// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// PROPS
interface RowProps {
	data: CustomerPersonalData
	style: React.CSSProperties
}

const CustomerRow: React.FC<RowProps> = ({ style, data }) => {
	return (
		<div className={Styles.row} style={style}>
			<span>
				<i>{data.email || ''}</i>
			</span>
			<span>
				<i>{data.name || ''}</i>
			</span>
			<span>
				<i>{data.phone || ''}</i>
			</span>
			<span>
				<i>{data.address || ''}</i>
			</span>
			<span>
				<i>{data.form || ''}</i>
			</span>
		</div>
	)
}

export default CustomerRow
