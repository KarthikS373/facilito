/**
 * Cupones por defecto
 * @param  {Coupon[]} coupons?
 * @returns {(Coupon | null)[]}
 */
const getDefCoupons = (coupons?: Coupon[]): (Coupon | null)[] =>
	coupons ? [...coupons, null] : [null]

/**
 * Guardar cupones
 * @param  {(Coupon|null)[]} currentCoupons
 * @param  {(component:keyofBlockComponent,value:FormInputValue)=>unknown} onChange?
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
export const deleteCoupon = (index: number, setCoupons: SetState<(Coupon | null)[]>): void => {
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
	setShowCouponSwitch: SetState<boolean>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	setShowCouponSwitch(checked)
	if (onChange) onChange('switch_1', checked)
}

export default getDefCoupons
