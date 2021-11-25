// REACT
import React, { useContext, useState } from 'react'

// COMPONENTES
import SideBar from './components/sidebar'
import Header from 'components/header'
import Info from './components/info'
import Link from 'components/link'
import View from 'components/view'

// HOOKS
import useDefaultFilter from 'hooks/filters'
import { changeFilter } from 'utils/tools'
import { useFilters } from './hooks'

// MATERIAL
import ColorButton from 'components/button'

// ICONS
import ShoppingCartTwoTone from '@mui/icons-material/ShoppingCartTwoTone'

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

	// FILTROS
	useFilters(setProducts, filter, productsCtx.products)

	// FILTRO INICIAL
	useDefaultFilter('products-filter', 'naz', setFilter)

	return (
		<View>
			{/* HEADER */}
			<Header
				customDescription={`${
					businessCtx.business?.products?.length || 0
				} ${$`producto(s) creados`}`}>
				<Link rKey='newProduct'>
					<ColorButton
						color='primary'
						variant='contained'
						startIcon={<ShoppingCartTwoTone />}
						$style={{
							background: 'var(--primary)',
							color: '#fff',
						}}>{$`Crear producto`}</ColorButton>
				</Link>
			</Header>

			{/* INFO */}
			<Info onOpenSideBar={handleSideBar(true)} />

			{/* LISTA DE PRODUCTOS */}
			<ProductsList
				filter={filter}
				products={products}
				setFilter={changeFilterEv}
				setProducts={setProducts}
			/>

			{/* SIDEBAR DE CATEGORÍAS */}
			<SideBar open={openSideBar} onClose={handleSideBar(false)} />
		</View>
	)
}

export default Products
