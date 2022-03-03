// REACT
import { useEffect, useContext } from 'react'

// UTILS
import getBusinessProducts from 'utils/products'

// TIPOS
import type { Unsubscribe } from '@firebase/firestore'

// CONTEXT
import ProductsContext from 'context/products'

/**
 * Hook de productos
 * @param  {SetState<Record<string, Product>>} setProducts
 * @param  {string} companyID
 */
const useProducts = (setProducts: SetState<Record<string, Product>>, companyID?: string): void => {
	useEffect(() => {
		let listener: Unsubscribe | undefined

		// OBTENER LISTENER
		if (companyID) getBusinessProducts(setProducts, companyID).then((listen) => (listener = listen))

		// LIMPIAR
		return () => {
			if (listener) listener()
		}
	}, [setProducts, companyID])
}

export default useProducts

/**
 * Hook de producto
 * @param  {string} productID
 * @param  {Record<string, Product>} customProducts
 * @returns {Product | undefined}
 */
export const useProduct = (
	productID?: string,
	customProducts?: Record<string, Product>
): Product | undefined => {
	const productsCtx = useContext(ProductsContext).products

	if (productID) {
		// CONTEXTO
		const products: Record<string, Product> = customProducts || productsCtx
		const currentProduct: Product | undefined = Object.values(products).find(
			(product: Product) => product.sku === productID
		)
		return currentProduct
	} else return undefined
}
