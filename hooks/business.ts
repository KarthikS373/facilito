// TOOLS
import { useEffect } from 'react'

// UTILS
import { getCompany } from 'utils/business'
import { getProducts } from 'utils/products'

/**
 * Hook de Business
 * @param  {boolean} isAuth
 * @param  {string|null} userBusiness
 * @param  {SetState<Business|null>} setBusiness
 */
const useBusiness = (
	isAuth: boolean,
	userBusiness: string | null,
	setBusiness: SetState<Business | null>
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
 * @param {SetState<Product[]>} setProducts
 * @param {boolean} isAuth
 * @param {string|null} companyID
 * @param {boolean} hasProducts
 */
export const useCompanyProducts = (
	setProducts: SetState<Product[] | null>,
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
