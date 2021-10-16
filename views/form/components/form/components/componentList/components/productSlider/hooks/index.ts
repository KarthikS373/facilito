import { useEffect } from 'react'
import type { FieldValues, UseFormRegister } from 'react-hook-form'

/**
 * Usar filtro de productos
 * @description Crear filtros en el slider de productos
 * @param setProductList
 * @param products
 * @param productsProps
 */
const useProductsFilter = (
	setProductList: React.Dispatch<React.SetStateAction<Product[] | null>>,
	products: Product[] | null,
	productsProps: string[] | undefined
): void => {
	useEffect(() => {
		if (products) {
			// PRODUCTOS
			const productsFilter: Product[] = productsProps
				?.map((id: string) => {
					// BUSCAR
					let current = -1
					products?.forEach((product: Product, pIndex: number) => {
						if (product.sku === id) current = pIndex
					})

					// RETORNAR
					if (current >= 0 && products) return products[current]
					else return undefined
				})
				.filter(Boolean)
				.sort((prevProduct?: Product) => (prevProduct?.featured ? -1 : 0)) as Product[]

			setProductList(productsFilter)
		} else setProductList(null)
	}, [setProductList, productsProps, products])
}

/**
 * Hook de registrar componentes
 * @description Registrar las propiedades del product slider
 * @param register
 * @param required
 * @param name
 * @param id
 */
export const useProductsRegister = (
	register: UseFormRegister<FieldValues> | null,
	required: boolean,
	name: string,
	id: number
): void => {
	useEffect(() => {
		if (register) {
			register(`products.summary_${name}_${id}`, {
				required,
				validate: (value) => typeof value === 'number',
			})
			register(`products.extras_${name}_${id}`)
			register(`products.${name}_${id}`, { required })
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name, id, required])
}

export default useProductsFilter
