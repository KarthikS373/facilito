import React from 'react'

// TARJETA
import ProductCard from 'views/form/components/form/components/componentList/components/productSlider/components/productCard'
import ProductSkeleton from './components/skeleton'

// ESTILOS
import Styles from './style.module.scss'

const showProduct = (product: React.MutableRefObject<Product>): void => {
	window.Alert({
		title: 'Visualizar producto',
		body: 'De esta manera se mostrara el producto en el carousel de productos en todas tus tiendas seleccionadas. El resto de imagenes se mostraran al seleccionarlo.',
		type: 'confirm',
		resetOnHide: true,
		maxWidth: 700,
		cancelBtn: <></>,
		customElements: (
			<div className={Styles.container}>
				<ProductSkeleton />
				<ProductCard
					index={0}
					productSpace={product.current}
					openBackdropProduct={() => () => null}
				/>
				<ProductSkeleton />
			</div>
		),
	})
}

export default showProduct
