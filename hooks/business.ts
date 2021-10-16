// TOOLS
import { useEffect } from 'react'

// UTILS
import { getCompany } from 'utils/business'
import { getProducts } from 'utils/products'

/**
 * Hook de Business
 * @param  {boolean} isAuth
 * @param  {string|null} userBusiness
 * @param  {React.Dispatch<React.SetStateAction<Business|null>>} setBusiness
 * @description Retorna la empresa asociada a un usuario
 */
const useBusiness = (
	isAuth: boolean,
	userBusiness: string | null,
	setBusiness: React.Dispatch<React.SetStateAction<Business | null>>
): void => {
	// FETCHs
	useEffect(() => {
		if (isAuth && userBusiness) getCompany(userBusiness).then(setBusiness)
	}, [userBusiness, isAuth, setBusiness])
}

// EXPORT
export default useBusiness

/**
 * Hook de productos de empresa
 * @description Retorna la lista de productos de una empresa
 * @param {React.Dispatch<React.SetStateAction<Product[]>>} setProducts
 * @param {boolean} isAuth
 * @param {string|null} companyID
 * @param {boolean} hasProducts
 */
export const useCompanyProducts = (
	setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>,
	isAuth: boolean,
	companyID: string | null,
	hasProducts: boolean
): void => {
	useEffect(() => {
		if (isAuth && companyID)
			if (hasProducts)
				getProducts(companyID).then((products: Product[] | null) => {
					setProducts(products)
				})
	}, [setProducts, isAuth, companyID, hasProducts])
}
