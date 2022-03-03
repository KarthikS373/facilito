/**
 * Filtrar productos
 * @param  {Product[]} products
 * @param  {string} filter
 * @returns {Product[]}
 */
const filterProducts = (products: Product[], filter: string): Product[] => {
	const tmpProducts = [...products]
	let field: string = filter.charAt(0)
	const sort: string = filter.substr(1)

	// BUSCAR COLUMNA
	if (field === 'n') field = 'title'
	else if (field === 's') field = 'sku'
	else if (field === 'c') field = 'category'
	else if (field === 'p') field = 'price'

	// ORDEN
	const ascSort: boolean = sort === 'az'

	// FILTRO
	tmpProducts.sort((aF: Product, bF: Product) => {
		const a = ascSort ? aF : bF
		const b = ascSort ? bF : aF
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (field !== 'price') return a[field]!.toString().localeCompare(b[field]?.toString() || '0')
		else return a[field] - b[field]
	})

	// ACTUALIZAR
	return tmpProducts
}

export default filterProducts
