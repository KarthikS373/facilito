import { useEffect } from 'react'
import type { FormSearchProps } from '..'

/**
 * Hook de productos
 * @description Actualizar lista de productos
 * @param props
 * @param setProductsList
 */
export const useProductList = (
	props: FormSearchProps,
	setProductsList: React.Dispatch<React.SetStateAction<Product[]>>
): void => {
	useEffect(() => {
		// PRODUCTOS
		const newProductsList: Product[] = []

		// BUSCAR
		props.components.forEach((component: BlockComponent) => {
			if (component.name === 'products' && component.products) {
				component.products.forEach((sku: string) => {
					const currentProduct = props.products.find((product: Product) => product.sku === sku)
					if (currentProduct) newProductsList.push(currentProduct)
				})
			}
		})

		// ACTUALIZAR
		setProductsList(newProductsList)
	}, [props.products, props.components, setProductsList])
}

/**
 * Registrar
 * @description Registrar propiedades completas de los productos
 * @param props
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
