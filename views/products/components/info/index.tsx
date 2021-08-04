// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'

// ICONOS
import CategoryTwoTone from '@material-ui/icons/CategoryTwoTone'
import StoreTwoTone from '@material-ui/icons/StoreTwoTone'

// MATERIAL
import Button from '@material-ui/core/Button'

// STRINGS
import withStrings from 'hoc/lang'

interface InfoProps {
	onOpenSideBar: () => unknown
}
const Info: React.FC<InfoProps> = withStrings(({ $, onOpenSideBar }) => {
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
})

export default Info
