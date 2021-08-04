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
import useDefaultFilter from 'hooks/filters'
import { useFilters } from './utils/hooks'
import { changeFilter } from 'utils/tools'

// MATERIAL
import Button from '@material-ui/core/Button'

// ICONS
import ShoppingCartTwoTone from '@material-ui/icons/ShoppingCartTwoTone'

// STRINGS
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'
import ProductsContext from 'context/products'

import dynamic from 'next/dynamic'
const ProductsList = dynamic(() => import('./components/productsList'))

const Products: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// PRODUCTOS
	const productsCtx = useContext(ProductsContext)

	// LISTA DE PRODUCTOS
	const [products, setProducts] = useState<Product[]>([])

	// FILTRO
	const [filter, setFilter] = useState<string>('naz')

	// CATEGORÍAS
	const [openSideBar, setOpenSideBar] = useState<boolean>(false)

	// ABRIR O CERRAR SIDEBAR
	const handleSideBar = (open: boolean) => () => setOpenSideBar(open)

	// ASIGNAR FILTRO
	const changeFilterEv = (newFilter: string) =>
		changeFilter('products-filter', newFilter, setFilter)

	const changesTrigger: string = Object.keys(productsCtx.products).join('')

	// FILTROS
	useFilters(setProducts, filter, changesTrigger, productsCtx.products)

	// FILTRO INICIAL
	useDefaultFilter('products-filter', 'naz', setFilter)

	return (
		<>
			{/* HEADER */}
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

			{/* INFO */}
			<Info onOpenSideBar={handleSideBar(true)} />

			{/* LISTA DE PRODUCTOS */}
			<ProductsList filter={filter} setFilter={changeFilterEv} products={products} />

			{/* SIDEBAR DE CATEGORÍAS */}
			<SideBar open={openSideBar} onClose={handleSideBar(false)} />
		</>
	)
}

export default Products
