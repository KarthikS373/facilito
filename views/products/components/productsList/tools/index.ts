import type { ProductContextProps } from 'context/products'

/**
 * Borrar producto
 * @param  {ProductContextProps} productsCtx
 * @param  {Product[]} products
 * @param  {number} currentIndex
 * @param  {SetState<Product[]>} setProducts
 */
const deleteProduct = (
	productsCtx: ProductContextProps,
	products: Product[],
	currentIndex: number,
	setProducts: SetState<Product[]>
): void => {
	window.Alert({
		title: 'Borrar producto',
		body: '¿Estas seguro de querer borrar este producto de tu inventario, esta acción sera permanente?',
		type: 'confirm',
		onConfirm: () => {
			// ELIMINAR
			const tmpProducts = { ...productsCtx.products }
			Object.keys(tmpProducts).forEach((key: string) => {
				if (key === products[currentIndex].sku) delete tmpProducts[key]
			})

			// ACTUALIZAR
			setProducts(Object.values(tmpProducts))
			productsCtx.setProducts(tmpProducts, false)
		},
	})
}

/**
 * Seleccionar fila
 * @param  {React.MouseEvent<HTMLButtonElement>} ev
 * @param  {number} index
 * @param  {SetState<HTMLElement|null>} setCurrentRow
 * @param  {SetState<number>} setCurrentIndex
 */
export const selectRow = (
	ev: React.MouseEvent<HTMLButtonElement>,
	index: number,
	setCurrentRow: SetState<HTMLElement | null>,
	setCurrentIndex: SetState<number>
): void => {
	setCurrentRow(ev.currentTarget)
	setCurrentIndex(index)
}

export default deleteProduct
