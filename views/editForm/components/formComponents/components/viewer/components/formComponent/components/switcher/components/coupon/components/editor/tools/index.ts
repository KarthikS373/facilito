import { SelectChangeEvent } from '@mui/material/Select'

/**
 * Cupones multiples
 * @param  {number} index
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {SetState<Coupon>} setCoupon
 * @param  {(coupon:Coupon)=>unknown} onChange
 */
export const handleMultipleCoupon = (
	index: number,
	ev: React.ChangeEvent<HTMLInputElement>,
	setCoupon: SetState<Coupon>,
	onChange: (coupon: Coupon) => unknown
): void => {
	const { value } = ev.target
	setCoupon((prevCoupon: Coupon) => {
		// COPIAR
		const newCoupon = { ...prevCoupon }
		const multiples = newCoupon.factors || []

		// ASIGNAR
		const newValue = Math.min(100, parseInt(value || '0', 10))
		if (index === 1) {
			if (newValue < multiples[0]) multiples[index] = newValue
		} else multiples[index] = newValue

		newCoupon.factors = multiples

		// ACTUALIZAR
		onChange(newCoupon)
		return newCoupon
	})
}

/**
 * Guardar producto
 * @param  {string|Product|null} product
 * @param  {SetState<Coupon>} setCoupon
 * @param  {(coupon:Coupon)=>unknown} onChange
 */
const saveProduct = (
	product: string | Product | null,
	setCoupon: SetState<Coupon>,
	onChange: (coupon: Coupon) => unknown
): void => {
	// AGREGAR
	setCoupon((prevCoupon: Coupon) => {
		// AGREGAR
		const newCoupon = { ...prevCoupon }
		if (product && typeof product !== 'string') {
			const products = newCoupon.products || []
			products.push({ sku: product.sku, title: product.title })
			newCoupon.products = products
		}

		onChange(newCoupon)
		return newCoupon
	})
}

/**
 * Borrar productos
 * @param  {number} index
 * @param  {SetState<Coupon>} setCoupon
 * @param  {(coupon:Coupon)=>unknown} onChange
 */
export const deleteProducts = (
	index: number,
	setCoupon: SetState<Coupon>,
	onChange: (coupon: Coupon) => unknown
): void => {
	// BORRAR
	setCoupon((prevCoupon: Coupon) => {
		// COPIA
		const newCoupon = { ...prevCoupon }
		newCoupon.products = newCoupon.products?.filter(
			(_product: Partial<Product>, prIndex: number) => prIndex !== index
		)

		onChange(newCoupon)
		return newCoupon
	})
}

/**
 * Cambiar tipo de cupon
 * @param  {SelectChangeEvent} ev
 * @param  {SetState<Coupon>} setCoupon
 * @param  {(coupon:Coupon)=>unknown} onChange
 */
export const handleCouponType = (
	ev: SelectChangeEvent,
	setCoupon: SetState<Coupon>,
	onChange: (coupon: Coupon) => unknown
): void => {
	const value = ev.target.value as Coupon['type']
	setCoupon((prevCoupon: Coupon) => {
		const newCoupon = { ...prevCoupon, type: value }
		onChange(newCoupon)
		return newCoupon
	})
}

/**
 * Cambiar cupon
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {SetState<Coupon>} setCoupon
 * @param  {(coupon:Coupon)=>unknown} onChange
 */
export const handleCouponFields = (
	ev: React.ChangeEvent<HTMLInputElement>,
	setCoupon: SetState<Coupon>,
	onChange: (coupon: Coupon) => unknown
): void => {
	const { name, value } = ev.target
	setCoupon((prevCoupon: Coupon) => {
		const newCoupon = {
			...prevCoupon,
			[name]:
				name === 'percent'
					? Math.min(100, parseInt(value || '0', 10))
					: name === 'count'
					? parseInt(value || '0', 10)
					: value,
		}

		onChange(newCoupon)
		return newCoupon
	})
}

/**
 * Valores por defecto
 * @param  {Coupon|null} defCoupon
 * @returns {Coupon}
 */
export const getDefValues = (defCoupon: Coupon | null): Coupon =>
	defCoupon ?? {
		type: 'discount',
		id: '',
		count: 0,
		enable: true,
	}

export default saveProduct
