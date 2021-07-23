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

export default saveFilter
