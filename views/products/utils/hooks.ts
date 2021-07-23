// REACT
import { useEffect } from 'react'

/**
 * Hook de filtro inicial
 * @description Actualiza el filtro de productos con el localStorage
 * @param  {React.Dispatch<React.SetStateAction<string>>} setFilter
 */
const useInitialFilter = (setFilter: React.Dispatch<React.SetStateAction<string>>) => {
	useEffect(() => {
		setFilter(window.localStorage.getItem('products-filter') || 'naz')
	}, [])
}

export default useInitialFilter
