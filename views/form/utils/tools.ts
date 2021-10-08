/// TOOLS
import { getPosition, reverseGeocoding } from 'utils/location'

/**
 * Referencias geo
 * @description Asignar posicion actual
 * @param formComponents
 * @param geoReferences
 */
export const setGeoRefs = async (
	formComponents: FormComponent[] | undefined,
	geoReferences: React.MutableRefObject<FormAnswerItemContainer>
): Promise<void> => {
	// CARGAR POSICIÓN
	getPosition().then(async (position: GeolocationPosition) => {
		const address: string = (
			await reverseGeocoding(position.coords.latitude, position.coords.longitude)
		).address

		// AGREGAR A RESPUESTAS
		let firstGeo = 0
		formComponents?.forEach((component: FormComponent) => {
			if (component.name === 'geo' && firstGeo === 0) {
				// CREAR RESPUESTA
				geoReferences.current[`geo_${component.id}`] = {
					quest: 'Localizacion',
					answer: address,
				}
				firstGeo++
			}
		})
	})
}

/**
 * Obtener cupones
 * @description Obtener lista de productos con cupon
 * @param components
 * @param setCouponProducts
 */
export const getCouponProducts = (coupons: (Coupon[] | undefined)[] | undefined): string[] => {
	// PRODUCTOS CON CUPONES
	const productCoupons = coupons
		? coupons
				.map((coupon) => {
					if (coupon)
						return coupon
							.map((coupon: Coupon) =>
								coupon.products
									? coupon.products.map((product: Partial<Product>) => product.sku || false)
									: ['']
							)
							.flat()
					else return false
				})
				.flat()
				.filter(Boolean)
		: ([] as string[])

	// ELIMINAR DUPLICADOS
	const filteredProductCoupons = [...new Set(productCoupons)] as string[]
	return filteredProductCoupons
}

/**
 * Tiene productos
 * @description Verificar si un formulario tiene productos
 * @param formComponents
 */
export const formHasComponent = (
	formComponents: BlockComponent[] | undefined,
	name: string,
	withSwitch1 = false,
	withSwitch2 = false
): boolean => {
	// COMPONENTES DE LOCALIZACIÓN
	const hasComponent: boolean = formComponents
		? formComponents?.some(
				(component: BlockComponent) =>
					component.name === name &&
					(withSwitch1 ? component.switch_1 : true) &&
					(withSwitch2 ? component.switch_2 : true)
		  )
		: false

	return hasComponent
}

/**
 * Obtener geo componentes
 * @description Componentes de geo localizacion
 * @param formComponents
 * @param geoReferences
 * @param lang
 */
export const setGeoComponents = (
	formComponents: BlockComponent[] | undefined,
	geoReferences: React.MutableRefObject<FormAnswerItemContainer | never>
): void => {
	// COMPONENTES DE LOCALIZACIÓN
	const hasLocations: boolean = formHasComponent(formComponents, 'geo', true)
	if (hasLocations) setGeoRefs(formComponents, geoReferences)
}
