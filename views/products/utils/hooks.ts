// REACT
import { useEffect } from 'react'

// UTILS
import filterProducts from './tools'

/**
 * Hook de filtros
 * @description Reordena los productos segun un filtro
 * @param  {React.Dispatch<React.SetStateAction<Product[]>>} setProducts
 * @param  {string} filter
 * @param  {string} changesTrigger
 * @param  {products: {[id:string]: Product}} products
 */
export const useFilters = (
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
	filter: string,
	changesTrigger: string,
	products: { [id: string]: Product }
) => {
	useEffect(() => {
		setProducts((prevProducts: Product[]) =>
			filterProducts(prevProducts.length === 0 ? Object.values(products) : prevProducts, filter)
		)
	}, [filter, changesTrigger])
}
