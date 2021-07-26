// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import IconButton from '@material-ui/core/IconButton'

// ICONS
import MoreVert from '@material-ui/icons/MoreVert'

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
			<span>• {index}</span>
			<span>{data?.personal_name_0.answer}</span>
			<span>{state}</span>
			<span>{data?.total || `${businessCtx.business.badge} 0.00`}</span>
			<span>{date && dateToString(date)}</span>
			<span>
				<IconButton onClick={handleRow}>
					<MoreVert />
				</IconButton>
			</span>
		</div>
	)
}

export default AnswerRow
