/**
 * Cambiar filtros
 * @description Cambia en localStorage el filtro
 * @param  {string} filter
 * @param  {React.Dispatch<React.SetStateAction<'asc' | 'des'>>} setFilter
 */
const changeFilter = (
	filter: 'asc' | 'des',
	setFilter: React.Dispatch<React.SetStateAction<'asc' | 'des'>>
) => {
	const newFilter: 'asc' | 'des' = filter === 'asc' ? 'des' : 'asc'
	window.localStorage.setItem('forms-filter', newFilter)
	setFilter(newFilter)
}

export default changeFilter
