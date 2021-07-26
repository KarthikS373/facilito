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
	let field: string = filter.charAt(0)
	let order: string = filter.substr(1)

	// BUSCAR COLUMNA
	if (field === 'n') field = 'title'
	else if (field === 's') field = 'sku'
	else if (field === 'c') field = 'category'
	else if (field === 'p') field = 'price'

	// ORDEN
	const ascOrder: boolean = order === 'az'

	// FILTRO
	tmpProducts.sort((aF: Product, bF: Product) => {
		const a = ascOrder ? aF : bF
		const b = ascOrder ? bF : aF
		if (field !== 'price') return a[field].toString().localeCompare(b[field].toString())
		else return a[field] - b[field]
	})

	// ACTUALIZAR
	return tmpProducts
}

export default saveFilter
