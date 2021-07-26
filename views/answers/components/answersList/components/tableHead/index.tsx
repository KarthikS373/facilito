// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// STRINGS
import withStrings from 'hoc/lang'

// ICONS
import PersonOutlineTwoTone from '@material-ui/icons/PersonOutlineTwoTone'
import BubbleChartTwoTone from '@material-ui/icons/BubbleChartTwoTone'
import LocalOfferTwoTone from '@material-ui/icons/LocalOfferTwoTone'
import EventNoteTwoTone from '@material-ui/icons/EventNoteTwoTone'
import SettingsTwoTone from '@material-ui/icons/SettingsTwoTone'
import ListAltTwoTone from '@material-ui/icons/ListAltTwoTone'

// PROPS
interface TableHeaderProps {
	style: React.CSSProperties
}
const TableHeader: React.FC<TableHeaderProps> = withStrings(({ $, style }) => {
	return (
		<div className={Styles.tableHeader} style={style}>
			<strong>
				<ListAltTwoTone />
			</strong>
			<strong>
				<PersonOutlineTwoTone />
				{$`Nombre en formulario`}
			</strong>
			<strong>
				<BubbleChartTwoTone />
				{$`Estado`}
			</strong>
			<strong>
				<LocalOfferTwoTone />
				{$`Total`}
			</strong>
			<strong>
				<EventNoteTwoTone />
				{$`Fecha de envío`}
			</strong>
			<strong>
				<SettingsTwoTone />
			</strong>
		</div>
	)
})

export default TableHeader
