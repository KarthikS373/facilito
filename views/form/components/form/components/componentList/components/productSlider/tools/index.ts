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
	setProductList: React.Dispatch<React.SetStateAction<Product[]>>
): void => {
	setProductList((productList: Product[]) => {
		// AGREGAR PRODUCTO
		const products: FormProductSliderAnswer[] = props.formProducts
			? ((props.formProducts[`${props.name}_${props.id}`] || []) as FormProductSliderAnswer[])
			: []
		const tmpProductList = [...productList]
		const extras: ExtraOptional[][] = props.formProducts
			? ((props.formProducts[`extras_${props.name}_${props.id}`] || []) as ExtraOptional[][])
			: []

		// ACTUALIZAR LISTA CON CONTADORES
		tmpProductList[index] = {
			...tmpProductList[index],
			count: tmpProductList[index].count - product.count,
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
		extras.push(product.extras)

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
	})
}

export default sendProduct
