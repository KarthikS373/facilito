import { sortAnswers } from 'utils/answers'
const REGEX = /^Subtotal:(?: )?(\w{0,3})(?: )?(\d+(\.\d+)?)/gm

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
				const matchs = component.answer.matchAll(REGEX)
				for (const match of matchs) price += +match?.[2]?.split(' ')[0]
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
			shippingMethodValue: data.data?.shippingMethod?.answer ?? '',
			payMethodValue: data.data?.payMethod?.answer ?? $`Pago en efectivo`,
		}
	}
}

/**
 * Obtener solo productos en respuesta
 * @param components
 * @param data
 * @returns
 */
export const getProductsAnswer = (
	components?: BlockComponent[],
	data?: FormAnswerItemContainer
): FormSortedAnswer[] => {
	if (components && data) {
		// ELIMINAR DATOS QUE NO SON PRODUCTOS
		const tmp = { ...data }
		Object.keys(tmp).forEach((key) => {
			if (!key.startsWith('product')) delete tmp[key]
		})

		const answers = sortAnswers(components, tmp)
		return answers
	} else return []
}

export default getSubTotal
