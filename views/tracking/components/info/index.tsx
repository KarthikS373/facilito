// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'

// ICONOS
import PhonelinkRingTwoTone from '@material-ui/icons/PhonelinkRingTwoTone'
import SortByAlphaTwoTone from '@material-ui/icons/SortByAlphaTwoTone'

// STRINGS
import withStrings from 'hoc/lang'

// MATERIAL
import Button from '@material-ui/core/Button'

// PROPS
interface InfoProps {
	changeFilter(): void
	filter: string
}
const Info: React.FC<InfoProps> = withStrings(({ $, changeFilter, filter }) => {
	return (
		<PageInfo
			title={$`Tracking de ordenes`}
			icon={<PhonelinkRingTwoTone />}
			description={$`Configura los mensajes y pasos para todas las ordenes.`}>
			<Button
				fullWidth
				variant='outlined'
				onClick={changeFilter}
				style={{ backgroundColor: '#fbfbfb' }}
				startIcon={<SortByAlphaTwoTone />}>
				{filter === 'asc' ? $`Filtrar ascendente` : $`Filtrar desendente`}
			</Button>
		</PageInfo>
	)
})

export default Info
