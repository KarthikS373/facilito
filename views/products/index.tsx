// REACT
import React, { useContext, useState } from 'react'

// COMPONENTES
import ProductsList from './components/productsList'
import SideBar from './components/sidebar'
import Header from 'components/header'
import Info from './components/info'

// UTILS
import useProducts, { useFilters, useInitialFilter } from './utils/hooks'
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
	// LISTA DE PRODUCTOS
	const [products, setProducts] = useState<Product[]>([])

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// FILTRO
	const [filter, setFilter] = useState<string>('naz')

	// CATEGORIAS
	const [openSideBar, setOpenSideBar] = useState<boolean>(false)

	// ABRIR O CERRAR SIDEBAR
	const handleSideBar = (open: boolean) => () => setOpenSideBar(open)

	// ASIGNAR FILTRO
	const changeFilter = (newFilter: string) => saveFilter(newFilter, setFilter)

	// FILTROS
	const productsLength: number = products.length
	useFilters(setProducts, filter, productsLength)

	// FILTRO INICIAL
	useInitialFilter(setFilter)

	// OBTENER PRODUCTOS
	useProducts(setProducts, businessCtx.business?.id)

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
			<Info filter={filter} setFilter={changeFilter} onOpenSideBar={handleSideBar(true)} />
			<ProductsList products={products} />
			<SideBar
				filter={filter}
				open={openSideBar}
				setProducts={setProducts}
				onClose={handleSideBar(false)}
			/>
		</>
	)
})

export default Products
