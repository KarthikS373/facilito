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
	style: React.CSSProperties
}
const TableHeader: React.FC<TableHeaderProps> = withStrings(({ $, style }) => {
	return (
		<div className={Styles.tableHeader} style={style}>
			<strong>
				<ImageTwoTone />
			</strong>
			<strong>
				<FormatColorTextTwoTone />
				{$`Titulo`}
			</strong>
			<strong>
				<FingerprintTwoTone />
				{$`SKU`}
			</strong>
			<strong>
				<WidgetsTwoTone />
				{$`Categoria`}
			</strong>
			<strong>
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
