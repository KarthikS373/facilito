/* eslint-disable @typescript-eslint/ban-ts-comment */
export interface ShippingPriceExt extends ShippingPrice {
	id: number
}

/**
 * Agregar valor
 * @description Agregar nuevo valor para shipping
 * @param id
 * @param name
 * @returns
 */
export const setShippingValue = (
	id: number,
	name: string,
	setShippingsList: SetState<ShippingPriceExt[]>,
	onChange: (shippingsList: ShippingPrice[]) => unknown,
	ev: React.ChangeEvent<HTMLInputElement>
): void => {
	const { value } = ev.target
	setShippingsList((prevList: ShippingPriceExt[]) => {
		// COPIA
		const newList: ShippingPriceExt[] = [...prevList]

		// ASIGNAR
		newList[id] = { ...newList[id], [name]: name === 'name' ? value : +value }
		onChange(Object.values(newList).filter((shipping: ShippingPrice) => shipping.name !== ''))

		// ACTUALIZAR
		return newList
	})
}

/**
 * Agregar fila
 * @description Agregar nueva fila para shipping
 * @param id
 * @param name
 * @returns
 */
export const addShipping = (
	id: number,
	setShippingsList: SetState<ShippingPriceExt[]>,
	onChange: (shippingsList: ShippingPrice[]) => unknown
): void => {
	setShippingsList((prevList: ShippingPriceExt[]) => {
		const newList: ShippingPriceExt[] = [...prevList]
		newList.splice(id + 1, 0, {
			name: '',
			price: 0,
			id: newList.length + 1,
		})
		onChange(Object.values(newList).filter((shipping: ShippingPrice) => shipping.name !== ''))
		return newList
	})
}

/**
 * Borrar valor
 * @description Borrar valor para shipping
 * @param id
 * @param name
 * @returns
 */
export const deleteShipping = (
	id: number,
	setShippingsList: SetState<ShippingPriceExt[]>,
	onChange: (shippingsList: ShippingPrice[]) => unknown
): void => {
	setShippingsList((prevList: ShippingPriceExt[]) => {
		const newList: ShippingPriceExt[] = [...prevList].filter((_ship, index) => index !== id)
		onChange(Object.values(newList).filter((shipping: ShippingPrice) => shipping.name !== ''))
		return newList
	})
}

/**
 *
 * @param defaultList
 * @returns
 */
const getDefaultState = (defaultList?: ShippingPrice[]): ShippingPriceExt[] =>
	// @ts-ignore
	defaultList?.length
		? defaultList.map((item, index) => ({ ...item, id: index }))
		: [
				{
					name: '',
					price: '',
					id: 0,
				},
		  ]

export default getDefaultState
