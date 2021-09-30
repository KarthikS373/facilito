// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import Gallery from './components/gallery'
import Tabs from './components/tabs'

// PROPS
interface ProductDataProps {
	productRef: React.MutableRefObject<Product>
	imagesRef: React.MutableRefObject<(File | null)[]>
}
const ProductData: React.FC<ProductDataProps> = ({ productRef, imagesRef }) => {
	return (
		<div className={Styles.container}>
			<Tabs
				key={productRef.current ? 'current_product' : 'empty_product'}
				productRef={productRef}
			/>
			<Gallery productRef={productRef} imagesRef={imagesRef} />
		</div>
	)
}

export default ProductData
