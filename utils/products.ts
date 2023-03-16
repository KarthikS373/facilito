// UTILS
import type { Unsubscribe } from '@firebase/auth'
import { getCollection } from './db'
import { uploadFile, compressImage, getURL } from './storage'

/**
 * Obtener productos
 * @param  {setProducts: (products:{[id:string]: Product}) => unknown}
 * @param  {string} companyID
 * @returns {Promise<Unsubscribe | undefined>}
 */
const getBusinessProducts = async (
	setProducts: (products: Record<string, Product>) => unknown,
	companyID?: string
): Promise<Unsubscribe | undefined> => {
	const { doc, onSnapshot } = await import('firebase/firestore')

	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const productsDoc = doc(col, companyID)

		return onSnapshot(productsDoc, (snap) => {
			const data = snap.data() as Record<string, Product>
			setProducts(data ?? {})
		})
	} else return undefined
}

export default getBusinessProducts

/**
 * Obtener productos
 * @param companyID
 * @returns {Promise<Product[] | null>}
 */
export const getProducts = async (companyID?: string): Promise<Product[] | null> => {
	const { doc, getDoc } = await import('firebase/firestore')

	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const productsDoc = doc(col, companyID)
		const productData = await getDoc(productsDoc)
		const products = productData.data() as Record<string, Product>
		return Object.values(products)
	} else return null
}

/**
 * Actualizar productos
 * @param  {Record<string, Product>,} products
 * @param  {string} companyID
 * @returns {Promise<void>}
 */
export const replaceProducts = async (
	products: Record<string, Product>,
	companyID?: string
): Promise<void> => {
	const { setDoc, doc } = await import('firebase/firestore')

	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const productsDoc = doc(col, companyID)

		// PRODUCTOS
		if (!Object.values(products).some((product) => product.sku.length === 0))
			return setDoc(productsDoc, products)
	}
}

/**
 * Agregar muchos productos
 * @param  {Partial<Product>[]} data
 * @param  {string} companyID?
 * @returns {Promise<void>}
 */
export const bulkUpdateProducts = async (
	data: Partial<Product>[],
	companyID?: string
): Promise<void> => {
	if (companyID) {
		const { getDoc, setDoc, doc } = await import('firebase/firestore')

		// BUSCAR
		const col = await getCollection('products')
		const companyProducts = doc(col, companyID)
		const productsData = (await getDoc(companyProducts)).data() as { [sku: string]: Product }

		// ACTUALIZAR
		data.forEach((product: Partial<Product>) => {
			// ACTUALIZAR
			if (product.sku) productsData[product.sku] = { ...productsData[product.sku], ...product }
		})

		// ASIGNAR PRODUCTO
		return setDoc(companyProducts, productsData)
	}
}

/**
 * Actualizar categorías
 * @param  {Product[]} products
 * @param  {string} oldCategory
 * @param  {string} newCategory
 * @returns {Product[]}
 */
export const changeProductsCategory = (
	products: Product[],
	oldCategory: string,
	newCategory: string
): Product[] => {
	const tmpProducts = [...products]
	// REMPLAZAR
	tmpProducts.forEach((currentProduct: Product) => {
		if (currentProduct.category === oldCategory) currentProduct.category = newCategory
	})

	// ASIGNAR
	return tmpProducts
}

/**
 * Guardar imagenes de un producto
 * @param  {(File|null)[]} images
 * @param  {string} sku
 * @param  {string} companyID?
 * @returns {Promise<string[]>}
 */
export const saveProductImages = async (
	images: (File | null)[],
	sku: string,
	companyID?: string
): Promise<string[]> => {
	if (companyID?.length && sku?.length) {
		// COMPRIMIR IMAGENES
		const compressedImages: (File | null)[] = await Promise.all(
			images.map((image: File | null) => {
				if (image) {
					return compressImage(image)
				} else return null
			})
		)

		// SUBIRLAS A STORAGE
		await Promise.all(
			compressedImages.map((image: File | null, imageIndex: number) => {
				if (image) {
					return uploadFile(image, `/${companyID}/products/${sku}_${imageIndex}`)
				} else return null
			})
		)

		const urls: string[] = (await Promise.all(
			compressedImages.map((image: File | null, imageIndex: number) => {
				if (image) return getURL(`/${companyID}/products/${sku}_${imageIndex}`)
				else return ''
			})
		)) as string[]
		return urls
	} else return Array(4).fill('')
}

export const getProduct = async (
	sku: string,
	companyID?: string
): Promise<any | undefined | null> => {
	const { doc, getDoc } = await import('firebase/firestore')

	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const docRef = doc(col, `${companyID}`)

		return (await getDoc(docRef)).data()?.[sku]
	}
	return null
}
