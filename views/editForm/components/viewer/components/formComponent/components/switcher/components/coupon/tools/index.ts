/**
 * Cupones por defecto
 * @description Obtener cupones por defecto para estado
 * @param coupons
 * @returns
 */
const getDefCoupons = (coupons?: Coupon[]): (Coupon | null)[] =>
	coupons ? [...coupons, null] : [null]

/**
 * Guardar cupones
 * @description Guardar y enviar todos los cupones
 * @param currentCoupons
 * @param onChange
 */
export const saveCoupons = (
	currentCoupons: (Coupon | null)[],
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	if (onChange)
		onChange(
			'coupons',
			currentCoupons.filter((coupon: Coupon | null) => coupon !== null) as Coupon[]
		)
}

/**
 * Borrar cupon
 * @description Borrar cupon de estado y global
 * @param index
 * @param setCoupons
 */
export const deleteCoupon = (
	index: number,
	setCoupons: React.Dispatch<React.SetStateAction<(Coupon | null)[]>>
): void => {
	setCoupons((prevCoupons: (Coupon | null)[]) => {
		// BORRAR
		const tmpCoupons = [...prevCoupons].filter(
			(_coupon: Coupon | null, cIndex: number) => cIndex !== index
		)

		// ACTUALIZAR
		saveCoupons(tmpCoupons)
		return tmpCoupons
	})
}

/**
 * Cambiar switch
 * @description Enviar cambio de switch para cupon
 * @param checked
 * @param setShowCouponSwitch
 * @param onChange
 */
export const onChangeSwitch = (
	checked: boolean,
	setShowCouponSwitch: React.Dispatch<React.SetStateAction<boolean>>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	setShowCouponSwitch(checked)
	if (onChange) onChange('switch_1', checked)
}

export default getDefCoupons
