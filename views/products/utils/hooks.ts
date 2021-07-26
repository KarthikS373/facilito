// REACT
import { useEffect } from 'react'

// UTILS
import { filterProducts } from './tools'

/**
 * Hook de filtro inicial
 * @description Actualiza el filtro de productos con el localStorage
 * @param  {React.Dispatch<React.SetStateAction<string>>} setFilter
 */
export const useInitialFilter = (setFilter: React.Dispatch<React.SetStateAction<string>>) => {
	useEffect(() => {
		setFilter(window.localStorage.getItem('products-filter') || 'naz')
	}, [])
}

/**
 * Hook de filtros
 * @description Reordena los productos segun un filtro
 * @param  {React.Dispatch<React.SetStateAction<Product[]>>} setProducts
 * @param  {string} filter
 * @param  {number} changesTrigger
 * @param  {products: {[id:string]: Product}} products
 */
export const useFilters = (
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
	filter: string,
	changesTrigger: number,
	products: { [id: string]: Product }
) => {
	useEffect(() => {
		setProducts((prevProducts: Product[]) =>
			filterProducts(prevProducts.length === 0 ? Object.values(products) : prevProducts, filter)
		)
	}, [filter, changesTrigger])
}
