import { useEffect } from 'react'

/**
 * Hook de categorias
 * @param defCategories
 * @param setCategories
 */
const useDefCategories = (
	defCategories: string[],
	setCategories: React.Dispatch<React.SetStateAction<string[]>>
): void => {
	useEffect(() => {
		setCategories(defCategories)
	}, [defCategories, setCategories])
}

export default useDefCategories
