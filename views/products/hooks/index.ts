// REACT
import { useEffect } from 'react'

// UTILS
import filterProducts from '../tools'

/**
 * "Cuando cambie el filtro, filtre los productos".
 *
 * Lo primero que hacemos es verificar si la matriz de productos está vacía. Si es así, lo establecemos
 * en los valores del objeto de productos. Esto se debe a que la matriz de productos está vacía cuando
 * la página se carga por primera vez.
 * @param setProducts - SetState<Product[]>: esta es la función de establecimiento para el estado de
 * los productos.
 * @param {string} filter - cadena: la cadena de filtro que estamos usando para filtrar los productos
 * @param products - Registro<cadena, Producto>
 */
export const useFilters = (
	setProducts: SetState<Product[]>,
	filter: string,
	products: Record<string, Product>
): void => {
	useEffect(() => {
		setProducts((prevProducts: Product[]) =>
			filterProducts(prevProducts.length === 0 ? Object.values(products) : prevProducts, filter)
		)
	}, [filter, setProducts, products])
}
