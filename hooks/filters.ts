// REACT
import { useEffect } from 'react'

/**
 * Hook de filtros
 * @description Usa el filtro por defecto del localStorage
 * @param  {string} key
 * @param  {string} defFilter
 * @param  {React.Dispatch<React.SetStateAction<string>>} setFilter
 */
const useDefaultFilter = (
	key: string,
	defFilter: string,
	setFilter: React.Dispatch<React.SetStateAction<string>>
) => {
	useEffect(() => {
		setFilter(window.localStorage.getItem(key) ?? defFilter)
	}, [])
}

export default useDefaultFilter
