// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// STRINGS
import useStrings from 'hooks/lang'

// ICONS
import FormatColorTextTwoTone from '@mui/icons-material/FormatColorTextTwoTone'
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone'
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone'
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone'
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone'

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
			<strong onClick={changeFilter('c')}>
				<EmailTwoToneIcon />
				{$`Correo`}
			</strong>
			<strong onClick={changeFilter('n')}>
				<FormatColorTextTwoTone />
				{$`Nombre`}
			</strong>
			<strong onClick={changeFilter('t')}>
				<LocalPhoneTwoToneIcon />
				{$`Teléfono`}
			</strong>
			<strong onClick={changeFilter('a')}>
				<BusinessTwoToneIcon />
				{$`Dirección`}
			</strong>
			<strong onClick={changeFilter('f')}>
				<StorefrontTwoToneIcon />
				{$`Tienda`}
			</strong>
		</div>
	)
}

export default TableHeader
