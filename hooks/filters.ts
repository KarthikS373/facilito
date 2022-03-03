// REACT
import { useEffect } from 'react'

/**
 * Hook de filtros
 * @param  {string} key
 * @param  {string} defFilter
 * @param  {SetState<string>} setFilter
 */
const useDefaultFilter = (key: string, defFilter: string, setFilter: SetState<string>): void => {
	useEffect(() => {
		setFilter(window.localStorage.getItem(key) ?? defFilter)
	}, [key, defFilter, setFilter])
}

export default useDefaultFilter
