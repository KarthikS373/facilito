// REACT
import React from 'react'

// COMPONENTES
import showProduct from './components/preview'
import PageInfo from 'components/pageInfo'

// ICONOS
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'

// MATERIAL
import Button from '@mui/material/Button'

// STRINGS
import useStrings from 'hooks/lang'

interface InfoProps {
	product: React.MutableRefObject<Product>
}
const Info: React.FC<InfoProps> = ({ product }) => {
	// STRINGS
	const { $ } = useStrings()

	// VISUALIZAR PRODUCTO
	const openPreview = () => showProduct(product)

	return (
		<PageInfo
			icon={<ShoppingBagTwoToneIcon />}
			title={$`Editar producto`}
			description={$`Configura los aspectos mas importantes de tu producto.`}>
			<Button
				onClick={openPreview}
				fullWidth
				variant='outlined'
				startIcon={<VisibilityTwoToneIcon />}>
				{$`Pre-Visualizar`}
			</Button>
		</PageInfo>
	)
}

export default Info
