// REACT
import { useEffect } from 'react'

// UTILS
import getBusinessProducts from 'utils/products'

/**
 * Hook de productos
 * @description Retorna la lista de productos por empresa.
 * @param  {React.Dispatch<React.SetStateAction<[id:string]: Product}>>} setProducts
 * @param  {string} companyID
 */
const useProducts = (
	setProducts: React.Dispatch<React.SetStateAction<{ [id: string]: Product }>>,
	companyID?: string
) => {
	useEffect(() => {
		let listener: () => unknown | null = null

		// OBTENER LISTENER
		if (companyID) getBusinessProducts(setProducts, companyID).then((listen) => (listener = listen))

		// LIMPIAR
		return () => {
			if (listener) listener()
		}
	}, [companyID])
}

export default useProducts
