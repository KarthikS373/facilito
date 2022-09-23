// REACT
import React, { useContext, useState, Suspense } from 'react'

// COMPONENTES
import ProductListSkeleton from '../products/components/productsList/components/skeleton'
import Header from 'components/header'
import View from 'components/view'
import Info from './info'

// MATERIAL
import ColorButton from 'components/button'

// ICONS
import ShoppingCartTwoTone from '@mui/icons-material/ShoppingCartTwoTone'

// STRINGS
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

import dynamic from 'next/dynamic'
const ProductsList = dynamic(() => import('../products/components/productsList'), {
	suspense: true,
})

const Stock: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// LISTA DE PRODUCTOS
	const [products, setProducts] = useState<Product[]>([])

	return (
		<View>
			{/* HEADER */}
			<Header
				customDescription={`${
					businessCtx.business?.products?.length || 0
				} ${$`producto(s) creados`}`}>
				<ColorButton
					color='primary'
					variant='contained'
					startIcon={<ShoppingCartTwoTone />}
					$style={{
						background: 'var(--primary)',
						color: '#fff',
					}}>{$`Descargar datos`}</ColorButton>
			</Header>

			{/* INFO */}
			<Info />

			{/* LISTA DE INVENTARIO */}
			<Suspense fallback={<ProductListSkeleton />}>
				<ProductsList
					filter={'naz'}
					products={products}
					setFilter={() => null}
					setProducts={setProducts}
				/>
			</Suspense>
		</View>
	)
}

export default Stock
