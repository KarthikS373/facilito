// REACT
import { useEffect, useContext } from 'react'

// UTILS
import getBusinessProducts from 'utils/products'

// CONTEXT
import ProductsContext from 'context/products'

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

/**
 * Hook de producto
 * @description Busca un producto en el contexto conun id
 * @param  {string} productID
 * @param  {{[id:string]: Product}} customProducts
 */
export const useProduct = (
	productID?: string,
	customProducts?: { [id: string]: Product }
): Product | undefined => {
	if (productID) {
		// CONTEXTO
		const products: { [id: string]: Product } =
			customProducts || useContext(ProductsContext).products
		const currentProduct: Product | undefined = Object.values(products).find(
			(product: Product) => product.sku === productID
		)
		return currentProduct
	} else return undefined
}
