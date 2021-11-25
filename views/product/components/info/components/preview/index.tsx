import React from 'react'

// TARJETA
import ProductCard from 'views/form/components/form/components/componentList/components/productSlider/components/productCard'

// ESTILOS
import Styles from './style.module.scss'

const showProduct = (product: React.MutableRefObject<Product>): void => {
	window.Alert({
		title: 'Visualizar',
		body: 'De esta manera se mostrara el producto en tus tiendas.',
		type: 'confirm',
		resetOnHide: true,
		maxWidth: 300,
		cancelBtn: <></>,
		customElements: (
			<div className={Styles.container}>
				<ProductCard
					index={0}
					productSpace={product.current}
					openBackdropProduct={() => () => null}
				/>
			</div>
		),
	})
}

export default showProduct
