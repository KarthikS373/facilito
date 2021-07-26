// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import IconButton from '@material-ui/core/IconButton'

// ICONS
import RemoveRedEyeTwoTone from '@material-ui/icons/RemoveRedEyeTwoTone'
import SettingsTwoTone from '@material-ui/icons/SettingsTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import PrintTwoTone from '@material-ui/icons/PrintTwoTone'

// UTILS
import { dateToString } from 'utils/tools'

// PROPS
interface RowProps {
	date: Date
	state: string
	index: number
	style: React.CSSProperties
	data: FormAnswerItemContainer
}
const AnswerRow: React.FC<RowProps> = ({ index, style, data, date, state }) => {
	return (
		<div className={Styles.row} style={style}>
			<span>• {index}</span>
			<span>{data?.personal_name_0.answer}</span>
			<span>{date && dateToString(date)}</span>
			<span>{state}</span>
			<span>
				<IconButton size='small'>
					<RemoveRedEyeTwoTone />
				</IconButton>
				<IconButton size='small'>
					<PrintTwoTone />
				</IconButton>
				<IconButton size='small'>
					<SettingsTwoTone />
				</IconButton>
				<IconButton size='small'>
					<DeleteTwoTone />
				</IconButton>
			</span>
		</div>
	)
}

export default AnswerRow
