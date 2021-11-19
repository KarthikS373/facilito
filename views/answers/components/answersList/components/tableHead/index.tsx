// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// STRINGS
import useStrings from 'hooks/lang'

// ICONS
import PersonOutlineTwoTone from '@mui/icons-material/PersonOutlineTwoTone'
import BubbleChartTwoTone from '@mui/icons-material/BubbleChartTwoTone'
import LocalOfferTwoTone from '@mui/icons-material/LocalOfferTwoTone'
import EventNoteTwoTone from '@mui/icons-material/EventNoteTwoTone'
import SettingsTwoTone from '@mui/icons-material/SettingsTwoTone'
import ListAltTwoTone from '@mui/icons-material/ListAltTwoTone'

// PROPS
interface TableHeaderProps {
	style: React.CSSProperties
	filter: string
	setFilter: (newFilter: string) => void
}
const TableHeader: React.FC<TableHeaderProps> = ({ filter, setFilter, style }) => {
	// STRINGS
	const { $ } = useStrings()

	// CAMBIAR FILTRO
	const changeFilter = (key: string) => () =>
		setFilter(`${key}${filter.substr(1).split('').reverse().join('')}`)

	return (
		<div className={Styles.tableHeader} style={style}>
			<strong onClick={changeFilter('i')}>
				<ListAltTwoTone />
			</strong>
			<strong onClick={changeFilter('n')}>
				<PersonOutlineTwoTone />
				{$`Nombre en tienda`}
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
}

export default TableHeader
