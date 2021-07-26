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
	filter: string
	setFilter: (newFilter: string) => void
}
const TableHeader: React.FC<TableHeaderProps> = withStrings(({ $, filter, setFilter, style }) => {
	// CAMBIAR FILTRO
	const changeFilter = (key: string) => () => {
		const order: string = filter.substr(1)

		// FILTRAR
		setFilter(`${key}${order.charAt(1)}${order.charAt(0)}`)
	}

	return (
		<div className={Styles.tableHeader} style={style}>
			<strong onClick={changeFilter('i')}>
				<ListAltTwoTone />
			</strong>
			<strong onClick={changeFilter('n')}>
				<PersonOutlineTwoTone />
				{$`Nombre en formulario`}
			</strong>
			<strong onClick={changeFilter('s')}>
				<BubbleChartTwoTone />
				{$`Estado`}
			</strong>
			<strong onClick={changeFilter('t')}>
				<LocalOfferTwoTone />
				{$`Total`}
			</strong>
			<strong onClick={changeFilter('d')}>
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
