// REACT
import React, { useContext, useState } from 'react'

// COMPONENTES
import ProductsList from './components/productsList'
import Header from 'components/header'
import Info from './components/info'

// UTILS
import useInitialFilter from './utils/hooks'
import saveFilter from './utils/tools'

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

	// FILTRO
	const [filter, setFilter] = useState<string>('naz')

	// ASIGNAR FILTRO
	const changeFilter = (newFilter: string) => saveFilter(newFilter, setFilter)

	// FILTRO INICIAL
	useInitialFilter(setFilter)

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
			<Info filter={filter} setFilter={changeFilter} />
			<ProductsList filter={filter} />
		</>
	)
})

export default Products
