import type { FieldValues, UseFormSetValue } from 'react-hook-form'

/**
 * Cerrar backdrop
 * @description Cerrar backdrop de productos
 * @param setCurrentProduct
 * @param setCurrentKey
 */
const closeBackdropProduct = (
	setCurrentProduct: React.Dispatch<React.SetStateAction<CurrentProduct | null>>,
	setCurrentKey: React.Dispatch<React.SetStateAction<number>>
): void => {
	setCurrentProduct(null)
	setCurrentKey((currentKey) => currentKey + 1)
}

/**
 * Enviar producto
 * @description Parser del contenido del producto buscado
 * @param props
 * @param product
 */
export const sendProduct = (
	product: ProductSelected,
	formProducts?: FormDataProductSliderAnswer,
	setValue?: UseFormSetValue<FieldValues> | null
): void => {
	// AGREGAR PRODUCTO
	const products: FormProductSliderAnswer[] = formProducts
		? ((formProducts.products_0 || []) as FormProductSliderAnswer[])
		: []
	const extras: ExtraProductData[][] = formProducts
		? ((formProducts.extras_products_0 || []) as ExtraProductData[][])
		: []

	// AGREGAR
	const sliderProduct: FormProductSliderAnswer = {
		picture: product.product.picture ? product.product.picture[0] : '',
		stockOption: product.product.stockOption,
		productCount: product.product.count,
		category: product.product.category,
		totalPrice: product.totalPrice,
		title: product.product.title,
		sku: product.product.sku,
		count: product.count,
		price: product.price,
	}
	products.push(sliderProduct)

	// CREAR EXTRAS
	const currentExtras: ExtraProductData[] = []
	product.extras.forEach((extra: ExtraOptionalExt) => {
		// BUSCAR TITULO
		const index = currentExtras.findIndex(
			(extraData: ExtraProductData) => extraData.title === extra.title
		)

		if (index >= 0) {
			// AGREGAR OPCION
			currentExtras[index].options.push({ name: extra.name, price: extra.price })
		} else {
			currentExtras.push({
				title: extra.title,
				options: [{ name: extra.name, price: extra.price }],
			})
		}
	})

	extras.push(currentExtras)

	// PRECIO TOTAL
	const totalPrice: number = products
		.map((productVal: FormProductSliderAnswer) => productVal.totalPrice)
		.reduce((price: number, nextPrice: number) => price + nextPrice, 0)

	// ENVIAR
	if (setValue) {
		setValue(`products.products_0`, products)
		setValue(`products.summary_products_0`, totalPrice)
		setValue(`products.extras_products_0`, extras)
	}
}

export default closeBackdropProduct
