// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// STRINGS
import useStrings from 'hooks/lang'

// ICONS
import FormatColorTextTwoTone from '@mui/icons-material/FormatColorTextTwoTone'
import FingerprintTwoTone from '@mui/icons-material/FingerprintTwoTone'
import LocalOfferTwoTone from '@mui/icons-material/LocalOfferTwoTone'
import SettingsTwoTone from '@mui/icons-material/SettingsTwoTone'
import WidgetsTwoTone from '@mui/icons-material/WidgetsTwoTone'
import ImageTwoTone from '@mui/icons-material/ImageTwoTone'

// PROPS
interface TableHeaderProps {
	filter: string
	style: React.CSSProperties
	setFilter: (newFilter: string) => void
}
const TableHeader: React.FC<TableHeaderProps> = ({ filter, setFilter, style }) => {
	// STRINGS
	const { $ } = useStrings()

	// CAMBIAR FILTRO
	const changeFilter = (key: string) => () => {
		const sort: string = filter.substr(1)

		// FILTRAR
		setFilter(`${key}${sort.charAt(1)}${sort.charAt(0)}`)
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
}

export default TableHeader
