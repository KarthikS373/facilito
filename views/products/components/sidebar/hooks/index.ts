import { useEffect } from 'react'

/**
 * Hook de categorias
 * @param  {string[]|undefined} defCategories
 * @param  {SetState<string[]>} setCategories
 */
const useDefCategories = (
	defCategories: string[] | undefined,
	setCategories: SetState<string[]>
): void => {
	useEffect(() => {
		setCategories(defCategories ?? [])
	}, [defCategories, setCategories])
}

export default useDefCategories
