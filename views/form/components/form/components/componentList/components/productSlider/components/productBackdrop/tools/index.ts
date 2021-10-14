import type { ProductBackdropProps } from '..'

/**
 * Enviar producto
 * @description Enviar producto y reiniciar
 * @param props
 * @param setExtrasCounter
 * @param extrasCounter
 * @param setProductsCounter
 * @param productsCounter
 */
const sendProduct = async (
	props: ProductBackdropProps,
	setExtrasCounter: React.Dispatch<React.SetStateAction<(ExtraOptional[] | undefined)[]>>,
	extrasCounter: (ExtraOptional[] | undefined)[],
	setProductsCounter: React.Dispatch<React.SetStateAction<number>>,
	productsCounter: number
): Promise<void> => {
	if (props.currentProduct?.product) {
		// // VALIDAR EXTRAS
		const invalidExtras: string[] = []
		if (props.currentProduct.product.extras)
			props.currentProduct.product.extras.forEach((extra: Extra, index: number) => {
				if (extra.required && !extrasCounter[index]) invalidExtras.push(extra.title)
			})

		// CREAR PRODUCTO A ENVIAR
		const extras = extrasCounter.filter(Boolean).flat() as ExtraOptional[]
		const price: number =
			(props.currentProduct?.product.isPromo
				? props.currentProduct?.product.promoPrice
				: props.currentProduct?.product.price) || 0
		const extrasPrice = extras
			.map((pExtra) => pExtra.price)
			.reduce((fExtra: number, nExtra: number) => fExtra + nExtra, 0)

		// PRODUCTO
		const cartProduct: ProductSelected = {
			product: props.currentProduct?.product,
			count: productsCounter,
			extras,
			totalPrice: price * productsCounter + extrasPrice,
		}

		// ENVIAR
		if (cartProduct.count > 0) {
			if (!invalidExtras.length) {
				// AGREGAR
				props.onAddProduct(cartProduct, props.currentProduct.index)

				// REINICIAR
				setProductsCounter(0)
				setExtrasCounter([])

				// CERRAR
				props.closeBackdropProduct()
			} else
				window.Alert({
					title: 'Ocurrió un error',
					body: 'Las opciones o extras "{{ extras }}" son obligatorios, intenta nuevamente cuando se completen.'.replace(
						'{{ extras }}',
						invalidExtras.join(', ')
					),
					type: 'error',
				})
		} else
			window.Alert({
				title: 'Ocurrió un error',
				body: 'Selecciona al menos un producto para poder agregar al carrito, o cierra esta ventana.',
				type: 'error',
			})
	}
}

/**
 * Contador de producto
 * @description Administrar contador
 * @param add
 * @param props
 * @param setProductsCounter
 * @returns
 */
export const handleProductCounter = (
	add: number,
	props: ProductBackdropProps,
	setProductsCounter: React.Dispatch<React.SetStateAction<number>>
): void => {
	setProductsCounter((productsCounter: number) =>
		Math.min(
			Math.max(0, productsCounter + add),
			props.currentProduct?.product.stockOption === 'inf'
				? Infinity
				: props.currentProduct?.product.stockOption === 'ctn'
				? Infinity
				: props.currentProduct?.product.count || 0
		)
	)
}

/**
 * Agregar extra
 * @descripcion Agregar extra de seleccion unica
 * @param index
 * @param extra
 * @param setExtrasCounter
 */
export const addExtra = (
	index: number,
	extra: ExtraOptional[] | undefined,
	setExtrasCounter: React.Dispatch<React.SetStateAction<(ExtraOptional[] | undefined)[]>>
): void => {
	setExtrasCounter((extras: (ExtraOptional[] | undefined)[]) => {
		extras[index] = extra
		return extras
	})
}

/**
 * Evento de cerrar
 * @description Cerrar y reiniciar
 * @param setProductsCounter
 * @param closeBackdropProduct
 */
export const onClose = (
	setProductsCounter: React.Dispatch<React.SetStateAction<number>>,
	closeBackdropProduct: EmptyFunction
): void => {
	setProductsCounter(0)
	closeBackdropProduct()
}

export default sendProduct
