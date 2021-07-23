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
 * Hook de productos
 * @description Retorna la lista de productos por empresa.
 * @param  {React.Dispatch<React.SetStateAction<Product[]>>} setProducts
 * @param  {number} productsLength
 * @param  {products: {[id:string]: Product}} products
 */
const useGlobalProducts = (
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
	productsLength: number,
	products: { [id: string]: Product }
) => {
	useEffect(() => {
		if (productsLength > 0) setProducts(Object.values(products))
	}, [productsLength])
}

export default useGlobalProducts

/**
 * Hook de filtros
 * @description Reordena los productos segun un filtro
 * @param  {React.Dispatch<React.SetStateAction<Product[]>>} setProducts
 * @param  {string} filter
 * @param  {number} productsLength
 */
export const useFilters = (
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
	filter: string,
	productsLength: number
) => {
	useEffect(() => {
		if (productsLength > 0)
			setProducts((prevProducts: Product[]) => filterProducts(prevProducts, filter))
	}, [filter, productsLength])
}
