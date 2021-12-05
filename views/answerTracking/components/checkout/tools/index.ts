/**
 * Obtener sub total
 * @param data
 * @returns
 */
const getSubTotal = (data?: FormAnswerTracking): number => {
	if (data) {
		let price = 0

		Object.entries(data.data).forEach(([name, component]) => {
			if (name.startsWith('products')) {
				price += parseFloat(component.answer.split('-')[1].match(/\d+(\.\d+)?/)?.[0] ?? '0')
			}
		})

		return price
	} else return 0
}

/**
 * Obtener cupones
 * @param data
 * @returns
 */
export const getCoupons = (data?: FormAnswerTracking): FormDataCouponsAnswer | undefined => {
	if (data) {
		const coupons = Object.fromEntries(
			Object.entries(data.data)
				.filter(([name]) => name.startsWith('coupons'))
				.map(([name, component]) => {
					return [name, component.answer]
				})
		)

		return coupons
	}
}

/**
 * Obtener productos de respuesta
 * @param data
 * @returns
 */
export const getProducts = (data?: FormAnswerTracking): FormDataProductSliderAnswer | undefined => {
	if (data) {
		const products = Object.fromEntries(
			Object.entries(data.data)
				.filter(([name]) => name.startsWith('products'))
				.map(([name, component]) => {
					return [
						name,
						[
							{
								count: 1,
								totalPrice: parseFloat(
									component.answer.split('-')[1].match(/\d+(\.\d+)?/)?.[0] ?? '0'
								),
								title: '',
								picture: '',
								sku: '',
								stockOption: 'inf',
								productCount: 1,
								category: '',
							} as FormProductSliderAnswer,
						],
					]
				})
		)

		return products
	}
}

/**
 * Obtener datos de envio
 * @param $
 * @param data
 * @returns
 */
export const getSummaryData = (
	$: TemplateStrBuilder,
	data?: FormAnswerTracking
): FormSummaryData | undefined => {
	if (data) {
		return {
			shippingMethodValue: data.data.shippingMethod.answer ?? '',
			payMethodValue: data.data.payMethod.answer ?? $`Pago en efectivo`,
		}
	}
}

export default getSubTotal
