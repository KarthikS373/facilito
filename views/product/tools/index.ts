import { BusinessContextProps } from 'context/business'
import { saveProductImages } from 'utils/products'
import { NextRouter } from 'next/router'
import ROUTES from 'router/routes'

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
	setProducts: (
		products: { [id: string]: Product },
		merge?: boolean,
		initialSKU?: string,
		onSuccess?: () => unknown
	) => unknown,
	productRef: React.MutableRefObject<Product>,
	imagesRef: React.MutableRefObject<(File | null)[]>,
	$: TemplateStrBuilder,
	history: NextRouter,
	businessCtx: BusinessContextProps,
	productID?: string
): Promise<void> => {
	// VALIDAR CAMPOS
	const valid = productRef.current.sku?.length * productRef.current?.title?.length

	if (valid && businessCtx?.business?.id?.length) {
		// GUARDAR EN STORAGE
		if (imagesRef.current.some((image) => image !== null)) {
			window.Snack($`Subiendo imagenes...`)
			const urls: string[] = await saveProductImages(
				imagesRef.current,
				productRef.current.sku,
				businessCtx.business.id
			)

			// GUARDAR EN DB
			productRef.current.picture = urls.map((url: string, urlIndex: number) => {
				if (
					productRef.current.picture[urlIndex]?.length &&
					!productRef.current.picture[urlIndex].startsWith('data:image')
				)
					return productRef.current.picture[urlIndex]
				else return url
			})
		}

		// CATEGORIAS NUEVAS
		if (
			productRef.current.category?.length &&
			!businessCtx.business.categories?.includes(productRef.current.category)
		) {
			businessCtx.setBusinessDB({
				categories: [...(businessCtx.business.categories ?? []), productRef.current.category]
					.filter(Boolean)
					.filter((category) => category.length > 0),
			})
		}

		// GUARDAR
		setProducts(
			{
				[productRef.current.sku]: productRef.current,
			},
			true,
			productID ?? '',
			() => {
				// REDIRECCIONAR
				if (productRef.current.sku?.length)
					history.replace(ROUTES.editProduct.replace(':productID', productRef.current.sku))
			}
		)
	} else
		window.Alert({
			title: 'Ocurrio un error',
			body: 'Debes agregar un SKU y Nombre primero para poder guardar este producto.',
			type: 'error',
		})
}

export default saveProduct
