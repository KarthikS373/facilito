// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'
import Link from 'components/link'

// MATERIAL
import Button from '@mui/material/Button'

// ICONOS
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone'
import AssignmentTwoTone from '@mui/icons-material/AssignmentTwoTone'

// STRINGS
import useStrings from 'hooks/lang'

const Info: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<PageInfo
			icon={<InventoryTwoToneIcon />}
			title={$`Lista de clientes`}
			description={$`Base de clientes registrados a traves de las tiendas.`}>
			<Link rKey='answers'>
				<Button fullWidth variant='outlined' startIcon={<AssignmentTwoTone />}>
					{$`Ver respuestas`}
				</Button>
			</Link>
		</PageInfo>
	)
}

export default Info
