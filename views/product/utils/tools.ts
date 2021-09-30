import { saveProductImages } from 'utils/products'

/**
 * Guardar producto
 * @description Guardar el producto en la base de datos y en storage
 * @param  {(products: { [id: string]: Product }, merge?: boolean) => unknown} setProducts
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {React.MutableRefObject<File[]>} imagesRef
 * @param  {TemplateStrBuilder} $
 * @param  {string} companyID
 */
const saveProduct = (
	setProducts: (products: { [id: string]: Product }, merge?: boolean) => unknown,
	productRef: React.MutableRefObject<Product>,
	imagesRef: React.MutableRefObject<(File | null)[]>,
	$: TemplateStrBuilder,
	companyID?: string
) => {
	if (productRef.current.sku?.length && companyID?.length) {
		// GUARDAR EN STORAGE
		window.Snack($`Subiendo imagenes...`)
		saveProductImages(imagesRef.current, productRef.current.sku, companyID).then(
			(urls: string[]) => {
				// GUARDAR EN DB
				productRef.current.picture = urls.map((url: string, urlIndex: number) => {
					if (productRef.current.picture[urlIndex]?.length)
						return productRef.current.picture[urlIndex]
					else return url
				})
				setProducts({
					[productRef.current.sku]: productRef.current,
				})
			}
		)
	}
}

export default saveProduct
