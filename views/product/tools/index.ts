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
const saveProduct = async (
	setProducts: (products: { [id: string]: Product }, merge?: boolean) => unknown,
	productRef: React.MutableRefObject<Product>,
	imagesRef: React.MutableRefObject<(File | null)[]>,
	$: TemplateStrBuilder,
	companyID?: string
): Promise<void> => {
	// VALIDAR CAMPOS
	const valid = productRef.current.sku?.length * productRef.current?.category?.length

	if (valid && companyID?.length) {
		// GUARDAR EN STORAGE
		if (imagesRef.current.every((image) => image !== null)) {
			window.Snack($`Subiendo imagenes...`)

			const urls: string[] = await saveProductImages(
				imagesRef.current,
				productRef.current.sku,
				companyID
			)

			// GUARDAR EN DB
			productRef.current.picture = urls.map((url: string, urlIndex: number) => {
				if (productRef.current.picture[urlIndex]?.length)
					return productRef.current.picture[urlIndex]
				else return url
			})
		}

		// GUARDAR
		setProducts({
			[productRef.current.sku]: productRef.current,
		})
	} else
		window.Alert({
			title: 'Ocurrio un error',
			body: 'Debes agregar un SKU, Nombre y Categoria primero para poder guardar este producto.',
			type: 'error',
		})
}

export default saveProduct
