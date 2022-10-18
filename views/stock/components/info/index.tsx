// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'
import Link from 'components/link'

// MATERIAL
import Button from '@mui/material/Button'

// ICONOS
import ShoppingCartTwoTone from '@mui/icons-material/ShoppingCartTwoTone'
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone'

// STRINGS
import useStrings from 'hooks/lang'

const Info: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<PageInfo
			icon={<InventoryTwoToneIcon />}
			title={$`Historial de inventarios`}
			description={$`En esta sección podrás ver el historial de inventarios.`}>
			<Link rKey='products'>
				<Button fullWidth variant='outlined' startIcon={<ShoppingCartTwoTone />}>
					{$`Ver productos`}
				</Button>
			</Link>
		</PageInfo>
	)
}

export default Info
