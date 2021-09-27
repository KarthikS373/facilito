// REACT
import React, { useContext, useRef } from 'react'

// COMPONENTES
import Header from 'components/header'
import Tabs from './components/tabs'
import Link from 'components/link'
import View from 'components/view'

// ICONOS
import SaveTwoTone from '@mui/icons-material/SaveTwoTone'

// MATERIAL
import ColorButton from 'components/button'

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
		<View>
			<Header
				customDescription={`${
					businessCtx.business?.products?.length || 0
				} ${$`producto(s) creados`}`}>
				<Link rKey='products' passHref>
					<ColorButton
						color='primary'
						variant='contained'
						startIcon={<SaveTwoTone />}
						$style={{ background: 'var(--primary)', color: '#fff' }}>
						{$`Guardar producto`}
					</ColorButton>
				</Link>
			</Header>
			<Tabs key={product ? 'current_product' : 'empty_product'} productRef={productRef} />
		</View>
	)
}

export default Product
