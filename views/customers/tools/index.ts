/**
 * Ordena una matriz de objetos por un campo dado, en orden ascendente o descendente
 * @param {CustomerSelf[]} customers - CustomerSelf[]
 * @param {string} filter - cuerda
 * @returns Una función que toma dos parámetros, clientes y filtro, y devuelve una matriz de objetos
 * CustomerSelf.
 */
export const filterCustomers = (customers: CustomerSelf[], filter: string): CustomerSelf[] => {
	const tmpCustomers = [...customers]
	const header: string = filter?.charAt(0) || 'n'
	const sort: string = filter?.substr(1) || 'az'
	let field: keyof CustomerPersonalData = 'name'

	if (header === 'c') field = 'email'
	else if (header === 't') field = 'phone'
	else if (header === 'a') field = 'address'
	else if (header === 'f') field = 'form'

	// ORDEN
	const ascSort: boolean = sort === 'az'

	// FILTRO
	tmpCustomers.sort((aF: CustomerSelf, bF: CustomerSelf) => {
		const a = ascSort ? aF : bF
		const b = ascSort ? bF : aF

		return a?.data?.[field]?.localeCompare(b?.data?.[field])
	})

	// ACTUALIZAR
	return tmpCustomers
}

export default filterCustomers
