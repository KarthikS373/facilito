// TOOLS
import { useEffect, useRef } from 'react'

// UTILS
import { getBusiness, getCompany } from 'utils/business'
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

/**
 * Hook para lista de negocios
 * @param  {(business:Business[])=>unknown} cb
 */
export const useBusinessList = (cb: (business: Business[]) => unknown) => {
	// COPIA
	const listRef: React.MutableRefObject<Business[] | null> = useRef(null)

	// FETCH
	useEffect(() => {
		if (listRef.current === null)
			getBusiness().then((business: Business[] | undefined) => {
				if (business) {
					listRef.current = business
					cb(business)
				}
			})
		else cb(listRef.current)
	}, [cb])
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
