// REACT
import { useEffect } from 'react'

// REACT-HOOK-FORM
import { UseFormSetValue, FieldValues } from 'react-hook-form'

/**
 * Hook de total
 * @param  {UseFormSetValue<FieldValues>} setValue
 * @param  {string} badge
 * @param  {number} totalPrice
 * @param  {number} discountTotal
 * @param  {number} taxesPrice
 * @param  {number} cardPrice
 * @param  {number} shippingPrice
 */
export const useSendTotalPrice = (
	setValue: UseFormSetValue<FieldValues>,
	badge: string,
	totalPrice: number,
	discountTotal: number,
	taxesPrice: number,
	cardPrice: number,
	shippingPrice: number
): void =>
	// ENVIAR A FORM
	useEffect(() => {
		if (totalPrice === 0) setValue && setValue('total', null)
		else if (setValue) {
			// IMPUESTOS , DELIVERY Y DESCUENTOS
			setValue('discountTotal', discountTotal)
			setValue('taxesPrice', taxesPrice)
			setValue('cardPrice', cardPrice)
			setValue('shippingPrice', shippingPrice)

			// TOTAL
			setValue(
				'total',
				`${badge} ${(totalPrice - discountTotal + taxesPrice + cardPrice + shippingPrice).toFixed(
					2
				)}`
			)
		}
	}, [badge, totalPrice, setValue, discountTotal, taxesPrice, cardPrice, shippingPrice])

/**
 * Hook de datos por defecto
 * @param  {SetState<FormSummaryData>} setData
 * @param  {FormSummaryData} defSummaryData?
 */
export const useDefData = (
	setData: SetState<FormSummaryData>,
	defSummaryData?: FormSummaryData
): void => {
	useEffect(() => {
		if (defSummaryData) setData(defSummaryData)
	}, [setData, defSummaryData])
}
