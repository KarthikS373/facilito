import type { ProductContextProps } from 'context/products'

/**
 * Borrar producto
 * @description Borra un producto en la DB y context
 * @param  {ProductContextProps} productsCtx
 * @param  {Product[]} products
 * @param  {number} currentIndex
 */
const deleteProduct = (
	productsCtx: ProductContextProps,
	products: Product[],
	currentIndex: number
): void => {
	window.Alert({
		title: 'Borrar productos',
		body: '¿Estas seguro de querer borrar este producto de tu inventario, esta acción sera permanente?',
		type: 'confirm',
		onConfirm: () => {
			// ELIMINAR
			const tmpProducts = { ...productsCtx.products }
			Object.keys(tmpProducts).forEach((key: string) => {
				if (key === products[currentIndex].sku) delete tmpProducts[key]
			})

			// ACTUALIZAR
			productsCtx.setProducts(tmpProducts, false)
		},
	})
}

export default deleteProduct