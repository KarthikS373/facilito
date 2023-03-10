// REACT
import React from 'react'
import { dateToString } from 'utils/tools'

// ESTILOS
import Styles from './style.module.scss'

// PROPS
interface RowProps {
	data: StockHistorySelf
	style: React.CSSProperties
}

const StockRow: React.FC<RowProps> = ({ style, data }) => {
	return (
		<div className={Styles.row} style={style}>
			<span>
				<i>{data?.data.product?.name || ''}</i>
			</span>
			<span>
				<i>{data?.data?.inputs || ''}</i>
			</span>
			<span>
				<i>{data?.data?.outputs || ''}</i>
			</span>
			<span>
				<i>{data?.date && dateToString(data.date)}</i>
			</span>
			<span>
				<i>{data?.data?.customer?.name || ''}</i>
			</span>
			<span>
				<i>{data?.formId || ''}</i>
			</span>
		</div>
	)
}

export default StockRow
