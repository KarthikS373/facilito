import type { FormContextProps } from '../../../context'

/**
 * Enviar formulario
 * @description Enviar producto como respuesta del formulario
 * @param product
 * @param index
 * @param props
 * @param setProductList
 */
const sendProduct = (
	product: ProductSelected,
	index: number,
	props: FormContextProps,
	setProductList: React.Dispatch<React.SetStateAction<Product[] | null>>
): void => {
	setProductList((productList: Product[] | null) => {
		if (productList !== null) {
			// AGREGAR PRODUCTO
			const products: FormProductSliderAnswer[] = props.formProducts
				? ((props.formProducts[`${props.name}_${props.id}`] || []) as FormProductSliderAnswer[])
				: []
			const tmpProductList = [...productList]
			const extras: ExtraProductData[][] = props.formProducts
				? ((props.formProducts[`extras_${props.name}_${props.id}`] || []) as ExtraProductData[][])
				: []

			// ACTUALIZAR LISTA CON CONTADORES
			tmpProductList[index] = {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				...tmpProductList[index]!,
				count: (tmpProductList[index]?.count || 0) - product.count,
			}

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
			if (props.setValue) {
				props.setValue(`products.summary_${props.name}_${props.id}`, totalPrice)
				props.setValue(`products.extras_${props.name}_${props.id}`, extras)
				props.setValue(`products.${props.name}_${props.id}`, products)
			}

			// ACTUALIZAR LISTA
			return tmpProductList
		} else return null
	})
}

export default sendProduct
