// UTILS
import { getCollection } from './db'

/**
 * Obtener productos
 * @description Retorna una lista de productos por empresa
 * @param  {string} companyID
 */
const getBusinessProducts = async (companyID?: string) => {
	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const productsDoc = col.doc(companyID)

		// PRODUCTOS
		const productsDocs = (await productsDoc.get()).data() as { [id: string]: Product }
		if (productsDocs) return productsDocs
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
