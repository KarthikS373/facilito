import { BusinessContextProps } from 'context/business'
import { saveProductImages } from 'utils/products'
import { NextRouter } from 'next/router'
import ROUTES from 'router/routes'

/**
 * Guardar producto
 * @param  {(products:Record<string,Product>,merge?:boolean,initialSKU?:string,onSuccess?:()=>unknown)=>unknown} setProducts
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {React.MutableRefObject<File|null>} imagesRef
 * @returns {Promise<void>}
 */
const saveProduct = async (
	setProducts: (
		products: Record<string, Product>,
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
	const sku = productRef.current.sku

	if (valid && businessCtx?.business?.id?.length) {
		// GUARDAR EN STORAGE
		if (imagesRef.current.some((image) => image !== null)) {
			window.Snack($`Subiendo imagenes...`)
			const urls: string[] = await saveProductImages(
				imagesRef.current,
				sku,
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

		// GUARDAR
		setProducts(
			{
				[sku]: productRef.current,
			},
			true,
			productID ?? '',
			async () => {
				// CATEGORIAS NUEVAS
				if (businessCtx.business) {
					const redirect = () => {
						// REDIRECCIONAR
						if (sku?.length) history.replace(ROUTES.products)
					}

					if (
						productRef.current.category?.length &&
						!businessCtx.business.categories?.includes(productRef.current.category)
					) {
						businessCtx.setBusinessDB(
							{
								categories: [
									...(businessCtx.business.categories ?? []),
									productRef.current.category,
								]
									.filter(Boolean)
									.filter((category) => category.length > 0),
							},
							redirect
						)
					} else redirect()
				}
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
