// REACT
import React, { useContext, useRef } from 'react'

// COMPONENTES
import Header from 'components/header'
import Tabs from './components/tabs'
import Link from 'components/link'

// ICONOS
import SaveTwoTone from '@mui/icons-material/SaveTwoTone'

// MATERIAL
import Button from '@mui/material/Button'

// CONTEXTO
import BusinessContext from 'context/business'

// HOOKS
import { useProduct } from 'hooks/products'
import useStrings from 'hooks/lang'

// UTILS
import defProduct from './utils/tools'

// CONTEXT
import ProductsContext from 'context/products'

// PROPS
interface ProductProps {
	productID?: string
}
const Product: React.FC<ProductProps> = ({ productID }) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// PRODUCTOS
	const productsCtx = useContext(ProductsContext)

	// PRODUCTO
	const product = useProduct(productID, productsCtx.products)

	// REFERENCIAS
	const productRef: React.MutableRefObject<Product> = useRef(product || defProduct)
	productRef.current = product || defProduct

	// STRINGS
	const { $ } = useStrings()

	return (
		<>
			<Header
				customDescription={`${
					businessCtx.business?.products?.length || 0
				} ${$`producto(s) creados`}`}>
				<Link rKey='products' passHref>
					<Button
						color='primary'
						variant='contained'
						style={{ color: '#fff' }}
						startIcon={<SaveTwoTone />}>
						{$`Guardar producto`}
					</Button>
				</Link>
			</Header>
			<Tabs key={product ? 'current_product' : 'empty_product'} productRef={productRef} />
		</>
	)
}

export default Product
