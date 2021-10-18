/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Limpiar formulario
 * @description Limpia todos los datos no necesarios en un formulario
 * @param data
 */
const cleanFormData = (data: { [id: string]: unknown }): { [id: string]: unknown } => {
	// @ts-ignore
	const tmpData = { ...data, ...data.products, ...data.coupons }
	delete tmpData.products
	delete tmpData.coupons

	// LIMPIAR
	Object.keys(tmpData).forEach((key) => tmpData[key] === undefined && delete tmpData[key])
	return tmpData
}

export default cleanFormData

/**
 * Obtener subtotal
 * @description Calcula el subtotal de la suma de productos
 * @param values
 */
export const getSubtotalPrice = (values: FormDataProductSliderAnswer | undefined): number => {
	if (values)
		return Object.keys(values)
			.map((resp: string) => {
				if (resp.startsWith('summary') && values[resp]) return +values[resp] as number
				else return 0
			})
			.reduce((price: number, nextPrice: number) => price + nextPrice, 0)
	else return 0
}

/**
 * Obtener contadores de productos
 * @description Cuenta los grupos de items de productos y los productos
 * @param values
 */
export const getProductsCounter: (
	values: FormDataProductSliderAnswer | undefined
) => [number, number] = (values: FormDataProductSliderAnswer | undefined) => {
	// GLOBALES
	let cartItems = 0

	// RECORRER
	const productsCounterMap: number[] = (
		values
			? Object.keys(values)
					.map((resp: string) => {
						if (!resp.startsWith('extras') && !resp.startsWith('summary')) {
							if (values[resp]) {
								const productsList = values[resp] as FormProductSliderAnswer[]
								cartItems += productsList.length
								return productsList.map(
									(slider: FormProductSliderAnswer) => slider.count
								) as number[]
							} else return [0]
						} else return [0]
					})
					.flat()
			: []
	) as number[]

	// CONTAR PRODUCTOS
	const productsCounter = productsCounterMap.reduce(
		(prevCount: number, nextCount: number) => prevCount + nextCount,
		0
	)

	// RETORNAR
	return [cartItems, productsCounter]
}
