// REACT
import { useEffect } from 'react'

// UTILS
import getBusinessProducts from 'utils/products'

/**
 * Hook de productos
 * @description Retorna la lista de productos por empresa.
 * @param  {React.Dispatch<React.SetStateAction<Product[]>>} setProducts
 * @param  {string} companyID
 */
const useProducts = (
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
	companyID?: string
) => {
	useEffect(() => {
		if (companyID) getBusinessProducts(companyID).then(setProducts)
	}, [companyID])
}

export default useProducts

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
			setProducts((prevProducts: Product[]) => {
				// PROPS
				const tmpProducts = [...prevProducts]
				const field: keyof Product = filter.startsWith('n') ? 'title' : 'category'
				const ascOrder: boolean = filter.includes('az') ? true : false

				if (ascOrder)
					return tmpProducts.sort((a: Product, b: Product) => a[field].localeCompare(b[field]))
				else return tmpProducts.sort((a: Product, b: Product) => b[field].localeCompare(a[field]))
			})
	}, [filter, productsLength])
}
