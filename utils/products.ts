// UTILS
import { getCollection } from './db'

/**
 * Obtener productos
 * @description Retorna una lista de productos por empresa
 * @param  {setProducts: (products:{[id:string]: Product}) => unknown}
 * @param  {string} companyID
 */
const getBusinessProducts = async (
	setProducts: (products: { [id: string]: Product }) => unknown,
	companyID?: string
) => {
	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const productsDoc = col.doc(companyID)

		return productsDoc.onSnapshot((snap) => {
			const data = snap.data() as { [id: string]: Product }
			setProducts(data)
		})
	}
}

export default getBusinessProducts

/**
 * Actualizar productos
 * @description Actualiza todos los productos
 * @param  {{[id:string]:Product}} products
 * @param  {string} companyID
 */
export const replaceProducts = async (products: { [id: string]: Product }, companyID?: string) => {
	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const productsDoc = col.doc(companyID)

		// PRODUCTOS
		return productsDoc.set(products)
	}
}

/**
 * Actualizar categorias
 * @description Actualiza todos los productos con una nueva categoria
 * @param  {Product[]} products
 * @param  {string} oldCategory
 * @param  {string} newCategory
 */
export const changeProductsCategory = (
	products: Product[],
	oldCategory: string,
	newCategory: string
) => {
	const tmpProducts = [...products]
	// REMPLAZAR
	tmpProducts.forEach((currentProduct: Product) => {
		if (currentProduct.category === oldCategory) currentProduct.category = newCategory
	})

	// ASIGNAR
	return tmpProducts
}
