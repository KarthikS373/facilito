// REACT
import React, { useContext, useState } from 'react'

// COMPONENTES
import SideBar from './components/sidebar'
import Header from 'components/header'
import Info from './components/info'

// NEXT
import Link from 'next/link'
import ROUTES from 'router/routes'

// UTILS
import { useFilters, useInitialFilter } from './utils/hooks'
import saveFilter from './utils/tools'

// MATERIAL
import Button from '@material-ui/core/Button'

// ICONS
import ShoppingCartTwoTone from '@material-ui/icons/ShoppingCartTwoTone'

// HOC
import withStrings from 'hoc/lang'

// CONTEXTO
import BusinessContext from 'context/business'
import ProductsContext from 'context/products'

import dynamic from 'next/dynamic'
const ProductsList = dynamic(() => import('./components/productsList'))

const Products: React.FC = withStrings(({ $ }) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// PRODUCTOS
	const productsCtx = useContext(ProductsContext)

	// LISTA DE PRODUCTOS
	const [products, setProducts] = useState<Product[]>([])

	// FILTRO
	const [filter, setFilter] = useState<string>('naz')

	// CATEGORIAS
	const [openSideBar, setOpenSideBar] = useState<boolean>(false)

	// ABRIR O CERRAR SIDEBAR
	const handleSideBar = (open: boolean) => () => setOpenSideBar(open)

	// ASIGNAR FILTRO
	const changeFilter = (newFilter: string) => saveFilter(newFilter, setFilter)

	const changesTrigger: number = Object.keys(productsCtx.products).length

	// FILTROS
	useFilters(setProducts, filter, changesTrigger, productsCtx.products)

	// FILTRO INICIAL
	useInitialFilter(setFilter)

	return (
		<>
			<Header
				customDescription={`${
					businessCtx.business?.products.length || 0
				} ${$`producto(s) creados`}`}>
				<Link href={ROUTES.newProduct}>
					<Button
						variant='contained'
						style={{ color: '#fff' }}
						startIcon={<ShoppingCartTwoTone />}
						color='primary'>{$`Crear producto`}</Button>
				</Link>
			</Header>
			<Info onOpenSideBar={handleSideBar(true)} />
			<ProductsList filter={filter} setFilter={changeFilter} products={products} />
			<SideBar open={openSideBar} onClose={handleSideBar(false)} />
		</>
	)
})

export default Products
