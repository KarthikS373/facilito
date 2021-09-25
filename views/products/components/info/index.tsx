// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'

// ICONOS
import CategoryTwoTone from '@mui/icons-material/CategoryTwoTone'
import StoreTwoTone from '@mui/icons-material/StoreTwoTone'

// MATERIAL
import Button from '@mui/material/Button'

// STRINGS
import useStrings from 'hooks/lang'

interface InfoProps {
	onOpenSideBar: () => unknown
}
const Info: React.FC<InfoProps> = ({ onOpenSideBar }) => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<PageInfo
			icon={<StoreTwoTone />}
			title={$`Catalogo de productos`}
			description={$`Agrega productos al inventario y muestralos en el carrito.`}>
			<Button fullWidth variant='outlined' onClick={onOpenSideBar} startIcon={<CategoryTwoTone />}>
				{$`Abrir categorias`}
			</Button>
		</PageInfo>
	)
}

export default Info
