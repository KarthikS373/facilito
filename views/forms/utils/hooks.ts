// REACT
import { useEffect } from 'react'

/**
 * Hook de filtros
 * @description Usa el filtro por defecto del localStorage
 * @param  {React.Dispatch<React.SetStateAction<'asc' | 'des'>>} setFilter
 */
const useDefaultFilter = (setFilter: React.Dispatch<React.SetStateAction<'asc' | 'des'>>) => {
	useEffect(() => {
		setFilter((window.localStorage.getItem('forms-filter') as 'asc' | 'des' | null) ?? 'asc')
	}, [])
}

export default useDefaultFilter
