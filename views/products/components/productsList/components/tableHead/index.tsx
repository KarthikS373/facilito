// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// STRINGS
import withStrings from 'hoc/lang'

// ICONS
import FormatColorTextTwoTone from '@material-ui/icons/FormatColorTextTwoTone'
import FingerprintTwoTone from '@material-ui/icons/FingerprintTwoTone'
import LocalOfferTwoTone from '@material-ui/icons/LocalOfferTwoTone'
import SettingsTwoTone from '@material-ui/icons/SettingsTwoTone'
import WidgetsTwoTone from '@material-ui/icons/WidgetsTwoTone'
import ImageTwoTone from '@material-ui/icons/ImageTwoTone'

// PROPS
interface TableHeaderProps {
	filter: string
	style: React.CSSProperties
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
			<strong>
				<ImageTwoTone />
			</strong>
			<strong onClick={changeFilter('n')}>
				<FormatColorTextTwoTone />
				{$`Titulo`}
			</strong>
			<strong onClick={changeFilter('s')}>
				<FingerprintTwoTone />
				{$`SKU`}
			</strong>
			<strong onClick={changeFilter('c')}>
				<WidgetsTwoTone />
				{$`Categoria`}
			</strong>
			<strong onClick={changeFilter('p')}>
				<LocalOfferTwoTone />
				{$`Precio`}
			</strong>
			<strong>
				<SettingsTwoTone style={{ marginLeft: '11px' }} />
			</strong>
		</div>
	)
})

export default TableHeader