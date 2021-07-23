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
		if (productsDocs) {
			const products = Object.values(productsDocs)

			// CREAR ARRAY
			return products
		}
	}
}

export default getBusinessProducts

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

/**
 * Actualizar categorias
 * @description Actualiza todos los productos con una nueva categoria
 * @param  {string} oldCategory
 * @param  {string} newCategory
 * @param  {string} companyID
 */
export const updateProductsCategory = async (
	oldCategory: string,
	newCategory: string,
	companyID?: string
) => {
	if (companyID) {
		const col = await getCollection('products')
		const doc = col.doc(companyID)
		const products = (await doc.get()).data() as { [index: string]: Product }
		const keys = Object.keys(products)
		const values = Object.values(products)

		// ASIGNAR
		return doc.set(
			Object.fromEntries(
				changeProductsCategory(values, oldCategory, newCategory).map(
					(product: Product, index: number) => [keys[index], product]
				)
			)
		)
	}
}
