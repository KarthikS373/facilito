// REACT
import React, { useContext } from 'react'

// COMPONENTES
import ProductsList from './components/productsList'
import Header from 'components/header'

// MATERIAL
import Button from '@material-ui/core/Button'

// ICONS
import ShoppingCartTwoTone from '@material-ui/icons/ShoppingCartTwoTone'

// HOC
import withStrings from 'hoc/lang'

// CONTEXTO
import BusinessContext from 'context/business'

const Products: React.FC = withStrings(({ $ }) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	return (
		<>
			<Header
				customDescription={`${
					businessCtx.business?.products.length || 0
				} ${$`producto(s) creados`}`}>
				<Button
					variant='contained'
					style={{ color: '#fff' }}
					startIcon={<ShoppingCartTwoTone />}
					color='primary'>{$`Crear producto`}</Button>
			</Header>
			<ProductsList />
		</>
	)
})

export default Products
