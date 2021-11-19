/**
 * Remover productos
 * @description Remover productos de todos los datos de la tienda
 * @param values
 * @param index
 * @param key
 * @param setValue
 */
const removeProducts = (
	values: FormDataProductSliderAnswer | undefined,
	index: number,
	key: string,
	setValue: (name: string, value: unknown) => unknown
): void => {
	if (values) {
		// PRODUCTOS
		let products = values[key] as FormProductSliderAnswer[]

		if (typeof products === 'object') {
			// FILTRAR PRODUCTOS
			products = products.filter((_pr: FormProductSliderAnswer, pIndex: number) => pIndex !== index)

			// PRECIO TOTAL
			const totalPrice = products
				.map((productVal: FormProductSliderAnswer) => productVal.totalPrice)
				.reduce((price: number, nextPrice: number) => price + nextPrice, 0)

			// EXTRAS
			let extras = values[`extras_${key}`] as ExtraProductData[][]
			if (extras && typeof extras === 'object') {
				extras = extras.filter((_ex: ExtraProductData[], pIndex: number) => pIndex !== index)
			}

			// GUARDAR EN TIENDA
			setValue(`products.${key}`, products)
			setValue(`products.summary_${key}`, totalPrice)
			setValue(`products.extras_${key}`, extras)
		}
	}
}

export default removeProducts
