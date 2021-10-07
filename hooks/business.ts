// TOOLS
import { useEffect } from 'react'

// UTILS
import { getCompany } from 'utils/business'
import { getProducts } from 'utils/products'

/**
 * Hook de Business
 * @param  {string|null} userBusiness
 * @param  {boolean} isAnonymous
 * @param  {React.Dispatch<React.SetStateAction<Business|null>>} setBusiness
 * @description Retorna la empresa asociada a un usuario
 */
const useBusiness = (
	userBusiness: string | null,
	isAnonymous: boolean,
	setBusiness: React.Dispatch<React.SetStateAction<Business | null>>
): void => {
	// FETCHs
	useEffect(() => {
		if (userBusiness && !isAnonymous) getCompany(userBusiness).then(setBusiness)
	}, [userBusiness, isAnonymous, setBusiness])
}

// EXPORT
export default useBusiness

/**
 * Hook de productos de empresa
 * @description Retorna la lista de productos de una empresa
 * @param setProducts
 * @param components
 * @param companyID
 * @param allowRequest
 */
export const useCompanyProducts = (
	setProducts: (products: Product[]) => unknown,
	hasProducts?: boolean,
	companyID?: string
): void => {
	useEffect(() => {
		if (companyID) {
			if (hasProducts)
				getProducts(companyID).then((products: Product[] | null) => {
					if (products) setProducts(products)
				})
		}
	}, [setProducts, companyID, hasProducts])
}
