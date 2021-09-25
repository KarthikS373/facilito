// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import IconButton from '@mui/material/IconButton'

// ICONS
import MoreVert from '@mui/icons-material/MoreVert'

// UTILS
import { dateToString } from 'utils/tools'

// CONTEXTO
import BusinessContext from 'context/business'

// PROPS
interface RowProps {
	date: Date
	state: string
	index: number
	style: React.CSSProperties
	data: FormAnswerItemContainer
	handleRow: (ev: React.MouseEvent<HTMLButtonElement>) => unknown
}
const AnswerRow: React.FC<RowProps> = ({ handleRow, index, style, data, date, state }) => {
	// BUSINES
	const businessCtx = useContext(BusinessContext)

	return (
		<div className={Styles.row} style={style}>
			<span>
				<i>• {index}</i>
			</span>
			<span>
				<i>{data?.personal_name_0.answer}</i>
			</span>
			<span>
				<i>{state}</i>
			</span>
			<span>
				<i>{data?.total?.answer || `${businessCtx.business?.badge || 'QGT'} 0.00`}</i>
			</span>
			<span>
				<i>{date && dateToString(date)}</i>
			</span>
			<span>
				<IconButton onClick={handleRow}>
					<MoreVert />
				</IconButton>
			</span>
		</div>
	)
}

export default AnswerRow
