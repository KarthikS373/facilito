import type { ProductBackdropProps } from '..'

/**
 * Enviar producto
 * @param  {ProductBackdropProps} props
 * @param  {SetState<(ExtraOptionalExt[]|undefined} setExtrasCounter
 * @returns {Promise<void>s}
 */
const sendProduct = async (
	props: ProductBackdropProps,
	setExtrasCounter: SetState<(ExtraOptionalExt[] | undefined)[]>,
	extrasCounter: (ExtraOptionalExt[] | undefined)[],
	setProductsCounter: SetState<number>,
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
		const extras = extrasCounter.filter(Boolean).flat() as ExtraOptionalExt[]
		const price: number =
			(props.currentProduct?.product.isPromo
				? props.currentProduct?.product.promoPrice
				: props.currentProduct?.product.price) || 0
		const extrasPrice = extras
			.map((pExtra) => +pExtra.price)
			.reduce((fExtra: number, nExtra: number) => fExtra + nExtra, 0)

		// PRODUCTO
		const cartProduct: ProductSelected = {
			totalPrice: (+price + +extrasPrice) * productsCounter,
			product: props.currentProduct?.product,
			count: productsCounter,
			extras,
			price,
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
 * @param  {number} add
 * @param  {ProductBackdropProps} props
 * @param  {SetState<number>} setProductsCounter
 */
export const handleProductCounter = (
	add: number,
	props: ProductBackdropProps,
	setProductsCounter: SetState<number>
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
 * @param  {number} index
 * @param  {ExtraOptionalExt[]|undefined} extra
 * @param  {SetState<(ExtraOptionalExt[]|undefined} setExtrasCounter
 */
export const addExtra = (
	index: number,
	extra: ExtraOptionalExt[] | undefined,
	setExtrasCounter: SetState<(ExtraOptionalExt[] | undefined)[]>
): void => {
	setExtrasCounter((extras: (ExtraOptionalExt[] | undefined)[]) => {
		extras[index] = extra
		return extras
	})
}

/**
 * Evento de cerrar
 * @param  {SetState<number>} setProductsCounter
 * @param  {EmptyFunction} closeBackdropProduct
 */
export const onClose = (
	setProductsCounter: SetState<number>,
	closeBackdropProduct: EmptyFunction
): void => {
	setProductsCounter(0)
	closeBackdropProduct()
}

export default sendProduct
