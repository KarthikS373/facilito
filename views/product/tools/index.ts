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
): void => {
	// VALIDAR CAMPOS
	const valid = productRef.current.sku?.length * productRef.current?.category?.length

	if (valid !== 0 && companyID?.length) {
		// GUARDAR EN STORAGE
		if (imagesRef.current.every((image) => image !== null)) {
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
	} else
		window.Alert({
			title: 'Ocurrio un error',
			body: 'Debes agregar un SKU, Nombre y Categoria primero para poder guardar este producto.',
			type: 'error',
		})
}

export default saveProduct
