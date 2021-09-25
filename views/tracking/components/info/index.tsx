// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'

// ICONOS
import PhonelinkRingTwoTone from '@mui/icons-material/PhonelinkRingTwoTone'
import SortByAlphaTwoTone from '@mui/icons-material/SortByAlphaTwoTone'

// STRINGS
import useStrings from 'hooks/lang'

// MATERIAL
import Button from '@mui/material/Button'

// PROPS
interface InfoProps {
	changeFilter(): void
	filter: string
}
const Info: React.FC<InfoProps> = ({ changeFilter, filter }) => {
	// STRINGS
	const { $ } = useStrings()

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
}

export default Info
