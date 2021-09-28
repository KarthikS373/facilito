// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'

// ICONOS
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'

// MATERIAL
import Button from '@mui/material/Button'

// STRINGS
import useStrings from 'hooks/lang'

const Info: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<PageInfo
			icon={<ShoppingBagTwoToneIcon />}
			title={$`Editar producto`}
			description={$`Configura los aspectos mas importantes de tu producto.`}>
			<Button fullWidth variant='outlined' startIcon={<VisibilityTwoToneIcon />}>
				{$`Visualizar producto`}
			</Button>
		</PageInfo>
	)
}

export default Info
