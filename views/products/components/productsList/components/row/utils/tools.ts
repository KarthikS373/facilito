/**
 * Borrar producto
 * @description Borra un producto en la DB y context
 * @param  {ContextProps} productsCtx
 * @param  {string} sku
 */
const deleteProduct = (productsCtx: any, sku: string) =>
	window.Alert({
		title: 'Borrar productos',
		body: '¿Estas seguro de querer borrar este producto de tu inventario, esta acción sera permanente?',
		type: 'confirm',
		onConfirm: () => {
			// ELIMINAR
			const tmpProducts = { ...productsCtx.products }
			Object.keys(tmpProducts).forEach((key: string) => {
				if (key === sku) delete tmpProducts[key]
			})

			// ACTUALIZAR
			productsCtx.setProducts(tmpProducts, false)
		},
	})

export default deleteProduct
