import { useEffect } from 'react'
import type { FieldValues, UseFormRegister } from 'react-hook-form'

/**
 * Usar filtro de productos
 * @param  {SetState<Product[]|null>} setProductList
 * @param  {Product[]|null} products
 * @param  {string[]|undefined} productsProps
 */
const useProductsFilter = (
	setProductList: SetState<Product[] | null>,
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
 * @param  {UseFormRegister<FieldValues>|null} register
 * @param  {boolean} required
 * @param  {string} name
 * @param  {number} id
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
				valueAsNumber: true,
			})
			register(`products.extras_${name}_${id}`)
			register(`products.${name}_${id}`, { required })
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name, id, required])
}

export default useProductsFilter
