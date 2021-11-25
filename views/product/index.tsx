// REACT
import React, { useContext, useRef } from 'react'

// COMPONENTES
import ProductData from './components/productData'
import Header from 'components/header'
import Info from './components/info'
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
import defProduct from './utils/initials'
import saveProduct from './tools'

// CONTEXT
import ProductsContext from 'context/products'

// PROPS
interface ProductProps {
	productID?: string
}
const Product: React.FC<ProductProps> = ({ productID }) => {
	// STRINGS
	const { $ } = useStrings()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// PRODUCTOS
	const productsCtx = useContext(ProductsContext)

	// PRODUCTO
	const product = useProduct(productID, productsCtx.products)

	// REFERENCIAS
	const productRef: React.MutableRefObject<Product> = useRef(product || defProduct)
	productRef.current = product || defProduct

	const imagesRef: React.MutableRefObject<(File | null)[]> = useRef(Array(4).fill(null))

	// GUARDAR PRODUCTO
	const saveProductData = () =>
		saveProduct(productsCtx.setProducts, productRef, imagesRef, $, businessCtx.business?.id)

	return (
		<View>
			<Header
				customDescription={`${
					businessCtx.business?.products?.length || 0
				} ${$`producto(s) creados`}`}>
				<ColorButton
					color='primary'
					variant='contained'
					onClick={saveProductData}
					startIcon={<SaveTwoTone />}
					$style={{ background: 'var(--primary)', color: '#fff' }}>
					{$`Guardar producto`}
				</ColorButton>
			</Header>
			<Info product={productRef} />
			<ProductData productRef={productRef} imagesRef={imagesRef} />
		</View>
	)
}

export default Product
