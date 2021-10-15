// REACT
import { useEffect } from 'react'

// REACT-HOOK-FORM
import { UseFormSetValue, FieldValues } from 'react-hook-form'

/**
 * Hook de total
 * @description Calcular y enviar total de productos
 * @param setValue
 * @param badge
 * @param totalPrice
 * @param discountTotal
 * @param taxesPrice
 * @param cardPrice
 * @param shippingPrice
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
