// REACT
import { useEffect } from 'react'

// UTILS
import getBusinessProducts from 'utils/products'

/**
 * Hook de Business
 * @description Retorna la lista de productos por empresa.
 * @param  {React.Dispatch<React.SetStateAction<Product[]>>} setProducts
 * @param  {string} companyID
 */
const useProducts = (
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
	companyID?: string
) => {
	useEffect(() => {
		if (companyID) getBusinessProducts(companyID).then(setProducts)
	}, [companyID])
}

export default useProducts
