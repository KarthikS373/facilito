import { useEffect } from 'react'
import type { FormSearchProps } from '..'

/**
 * Hook de productos
 * @param  {FormSearchProps} props
 * @param  {SetState<Product[]>} setProductsList
 */
export const useProductList = (
	props: FormSearchProps,
	setProductsList: SetState<Product[]>
): void => {
	useEffect(() => {
		// PRODUCTOS
		const newProductsList: Product[] = []

		// BUSCAR
		props.components.forEach((component: BlockComponent) => {
			if (component.name === 'products' && component.products) {
				component.products.forEach((sku: string) => {
					const currentProduct = props.products?.find((product: Product) => product.sku === sku)
					if (currentProduct) newProductsList.push(currentProduct)
				})
			}
		})

		// ACTUALIZAR
		setProductsList(newProductsList)
	}, [props.products, props.components, setProductsList])
}

/**
 * Registrar componente
 * @param  {FormSearchProps} props
 */
export const useCustomRegister = (props: FormSearchProps): void => {
	useEffect(() => {
		if (props.register) {
			props.register(`products.summary_products_0`)
			props.register(`products.extras_products_0`)
			props.register(`products.products_0`)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
