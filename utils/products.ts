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
