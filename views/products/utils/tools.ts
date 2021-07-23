/**
 * Guardar filtro de productos
 * @description Guarda en el localStorage el filtro
 * @param  {string} filter
 * @param  {React.Dispatch<React.SetStateAction<string>>} setFilter
 */
const saveFilter = (filter: string, setFilter: React.Dispatch<React.SetStateAction<string>>) => {
	window.localStorage.setItem('products-filter', filter)
	setFilter(filter)
}

/**
 * Filtrar productos
 * @description Reordena los productos segun un filtro
 * @param  {Product[]} products
 * @param  {string} filter
 */

export const filterProducts = (products: Product[], filter: string) => {
	const tmpProducts = [...products]
	const field: keyof Product = filter.startsWith('n') ? 'title' : 'category'
	const ascOrder: boolean = filter.includes('az') ? true : false

	if (ascOrder) tmpProducts.sort((a: Product, b: Product) => a[field].localeCompare(b[field]))
	else tmpProducts.sort((a: Product, b: Product) => b[field].localeCompare(a[field]))

	return tmpProducts
}

export default saveFilter
