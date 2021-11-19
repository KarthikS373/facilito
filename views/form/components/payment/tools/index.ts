import { getCountryCode, getIP, getPostalAndCity } from 'utils/location'

/**
 * Crear pago con tienda
 * @description Crear pago en pagalo desde datos de tienda
 * @param data
 * @param badge
 * @param cardData
 * @param endpoint
 * @returns
 */
export const makePaymentWithFormData = async (
	data: { [id: string]: unknown },
	badge: string,
	cardData: CardPointeData,
	endpoint: string
): Promise<unknown> => {
	// PRODUCTOS
	const productsDetails: PaymentData['detalle'] = []

	// RECORRER
	Object.keys(data).forEach((key: string) => {
		if (key.startsWith('products')) {
			if (data[key] && typeof data[key] === 'object') {
				const products: FormProductSliderAnswer[] = data[key] as FormProductSliderAnswer[]
				products.forEach((product: FormProductSliderAnswer) => {
					// CREAR OBJETO DE DETALLE
					productsDetails.push({
						id_producto: product.sku,
						nombre: product.title,
						precio: product.totalPrice.toFixed(2),
						cantidad: product.count,
						tipo: 'producto',
						Subtotal: product.totalPrice?.toFixed(2),
					})
				})
			}
		}
	})

	// AGREGAR COBROS DE IMPUESTOS
	if (data.taxesPrice)
		productsDetails.push({
			id_producto: 'taxes',
			nombre: 'Impuestos',
			precio: (data.taxesPrice as number).toFixed(2),
			cantidad: 1,
			tipo: 'servicio',
			Subtotal: (data.taxesPrice as number).toFixed(2),
		})

	// AGREGAR COBROS DE TARJETA
	if (data.cardPrice)
		productsDetails.push({
			id_producto: 'card_percentage',
			nombre: 'Porcentaje de tarjeta',
			precio: (data.cardPrice as number).toFixed(2),
			cantidad: 1,
			tipo: 'servicio',
			Subtotal: (data.cardPrice as number).toFixed(2),
		})

	// AGREGAR COBROS DE DELIVERY
	if (data.shippingPrice)
		productsDetails.push({
			id_producto: 'shipping',
			nombre: 'Envío',
			precio: (data.shippingPrice as number).toFixed(2),
			cantidad: 1,
			tipo: 'servicio',
			Subtotal: (data.shippingPrice as number).toFixed(2),
		})

	// DATOS (PETICIONES)
	const now: Date = new Date()
	const countryCode: string = await getCountryCode()
	const postalAndCity: string[] = await getPostalAndCity()
	const ip: string = await getIP()

	const paymentData: PaymentData = {
		cliente: {
			currency: badge.trim() === 'GTQ' ? badge.trim() : badge.trim().substr(1),
			firstName: (data.personal_name_0 as string)?.toString().split(' ')[0],
			lastName: (data.personal_name_0 as string)?.toString().split(' ')[1] || '',
			street1: (data.personal_address_0 as string) || '',
			country: countryCode,
			city: postalAndCity[1],
			state: countryCode,
			postalCode: postalAndCity[0],
			email: (data.personal_email_0 as string)?.toString() || '',
			ipAddress: ip,
			phone:
				parseInt(
					data.personal_phone_0
						? (data.personal_phone_0 as string).toString().replace('+', '')
						: '0',
					10
				)?.toString() || '',
			Total: parseFloat(
				data.total ? (data.total as string)?.replace(badge, '').substr(1) : '0'
			).toFixed(2),
			fecha_transaccion: `${now.getFullYear()}-${(now.getMonth() + 1)
				.toString()
				.padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now
				.toLocaleTimeString('en-US')
				.slice(0, -3)}`,
		},
		tarjetaPagalo: {
			nameCard: cardData.name,
			accountNumber: cardData.account,
			expirationMonth: cardData.expiry?.slice(0, 2),
			expirationYear: `20${cardData.expiry?.slice(2, 4)}`,
			CVVCard: cardData.cvv2,
		},
		detalle: productsDetails,
	}

	// LLAMAR Y RETORNAR
	const request = await fetch(`https://us-central1-facilito-app.cloudfunctions.net/${endpoint}`, {
		method: 'POST',
		body: JSON.stringify(paymentData),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const json = await request.json()
	return json
}
