// UTILS
import type { Unsubscribe } from '@firebase/auth'
import { getCollection } from './db'
import { uploadFile, compressImage, getURL } from './storage'

/**
 * Obtener productos
 * @description Retorna una lista de productos por empresa
 * @param  {setProducts: (products:{[id:string]: Product}) => unknown}
 * @param  {string} companyID
 */
const getBusinessProducts = async (
	setProducts: (products: { [id: string]: Product }) => unknown,
	companyID?: string
): Promise<Unsubscribe | undefined> => {
	const { doc, onSnapshot } = await import('firebase/firestore')

	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const productsDoc = doc(col, companyID)

		return onSnapshot(productsDoc, (snap) => {
			const data = snap.data() as { [id: string]: Product }
			setProducts(data)
		})
	} else return undefined
}

export default getBusinessProducts

/**
 * Obtener productos
 * @description Retorna todos los productos de una empresa
 * @param companyID
 */
export const getProducts = async (companyID?: string): Promise<Product[] | null> => {
	const { doc, getDoc } = await import('firebase/firestore')

	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const productsDoc = doc(col, companyID)
		const productData = await getDoc(productsDoc)
		const products = productData.data() as { [id: string]: Product }
		return Object.values(products)
	} else return null
}

/**
 * Actualizar productos
 * @description Actualiza todos los productos
 * @param  {{[id:string]:Product}} products
 * @param  {string} companyID
 */
export const replaceProducts = async (
	products: { [id: string]: Product },
	companyID?: string
): Promise<void> => {
	const { setDoc, doc } = await import('firebase/firestore')

	// COLLECTION
	const col = await getCollection('products')

	if (companyID) {
		const productsDoc = doc(col, companyID)

		// PRODUCTOS
		return setDoc(productsDoc, products)
	}
}

/**
 * Agregar muchos productos
 * @description Agregar productos como arreglo
 * @param data
 * @param companyID
 * @returns
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
 * @description Actualiza todos los productos con una nueva categoría
 * @param  {Product[]} products
 * @param  {string} oldCategory
 * @param  {string} newCategory
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
 * @description Sube a storage la lista de imagenes de un producto
 * @param  {File[]} images
 * @param  {string} sku
 * @param  {string} companyID
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
