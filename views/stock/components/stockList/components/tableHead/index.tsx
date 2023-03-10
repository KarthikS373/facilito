// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// STRINGS
import useStrings from 'hooks/lang'

// ICONS
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone'
import FormatColorTextTwoTone from '@mui/icons-material/FormatColorTextTwoTone'
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone'
import OutputTwoToneIcon from '@mui/icons-material/OutputTwoTone'
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone'

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
			<strong onClick={changeFilter('n')}>
				<FormatColorTextTwoTone />
				{$`Nombre`}
			</strong>
			<strong onClick={changeFilter('i')}>
				<OutputTwoToneIcon />
				{$`Entrada`}
			</strong>
			<strong onClick={changeFilter('o')}>
				<OutputTwoToneIcon style={{ transform: 'rotate(180deg)' }} />
				{$`Salida`}
			</strong>
			<strong onClick={changeFilter('d')}>
				<EventTwoToneIcon />
				{$`Fecha`}
			</strong>
			<strong onClick={changeFilter('c')}>
				<PersonOutlineTwoToneIcon />
				{$`Cliente`}
			</strong>
			<strong onClick={changeFilter('s')}>
				<StorefrontTwoToneIcon />
				{$`Tienda`}
			</strong>
		</div>
	)
}

export default TableHeader
