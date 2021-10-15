/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Buscar cupones
 * @description Buscar cupones por id
 * @param couponCode
 * @param components
 * @returns
 */
export const findCouponsById = (
	couponCode: string,
	components: BlockComponent[]
): Coupon | undefined => {
	// BUSCAR CUPÓN
	let validCoupon: Coupon | undefined
	components.forEach((component: BlockComponent) => {
		if (component.coupons)
			component.coupons.forEach((coupon: Coupon) => {
				if (coupon.id.toUpperCase() === couponCode && coupon.enable && coupon.count > 0)
					validCoupon = coupon
			})
	})
	return validCoupon
}

/**
 * Precio de cupones
 * @description Calcular precio de cupones
 * @param formProducts
 * @param currentCoupon
 * @param totalPrice
 * @returns
 */
export const computeCoupon = (
	formProducts: FormDataProductSliderAnswer | undefined,
	currentCoupon: (Coupon | null)[],
	totalPrice: number
): number[] => {
	if (formProducts) {
		// PRECIOS DE PRODUCTOS [SKU, PRECIO][]
		const productsPriceMatrix = Object.keys(formProducts)
			.map((resp: string) => {
				if (!resp.startsWith('summary') && !resp.startsWith('extras')) {
					const price: [number, string] = formProducts[resp]
						? // @ts-ignore
						  formProducts[resp].map((product: FormProductSliderAnswer) =>
								Array(product.count).fill([product.totalPrice / product.count, product.sku])
						  )
						: [0].flat()
					return price
				} else return [-1, '']
			})

			.filter((prPrice: (number | string)[]) => prPrice[0] !== -1)
		// @ts-ignore
		const productsPrice = productsPriceMatrix.flat() as [number, string][]

		// PRECIO DE CUPÓN
		const couponDiscount: number[] = []

		// CALCULAR DESCUENTOS
		currentCoupon.forEach((coupon: Coupon | null) => {
			if (coupon) {
				if (coupon.type === 'discount') {
					if (coupon.products && coupon.products.length > 0) {
						// CALCULAR DESCUENTO POR PRODUCTO TOTAL
						const totalDiscount: number = productsPrice
							.map((productPrice: [number, string]) => {
								if (coupon.products && coupon.products.length > 0) {
									// BUSCAR EN CUPÓN
									const currentProductPrice: Partial<Product> | undefined = coupon.products.find(
										(product: Partial<Product>) => productPrice[1] === product.sku
									)

									// CALCULAR DESCUENTO
									if (currentProductPrice && coupon.percent)
										return productPrice[0] - productPrice[0] * (coupon.percent / 100)
									else return 0
								} else return 0
							})
							.reduce((price: number, nextPrice: number) => price + nextPrice, 0)

						// AGREGAR
						couponDiscount.push(totalDiscount > 0 ? totalPrice - totalDiscount : totalDiscount)
					} else if (coupon.percent) couponDiscount.push(totalPrice * (coupon.percent / 100))
				} else {
					if (coupon.products && coupon.products.length > 0) {
						// CALCULAR DESCUENTO POR PRODUCTO TOTAL
						const totalDiscount: number = coupon.products
							.map((product: Partial<Product>) => {
								if (coupon.factors) {
									// BUSCAR PRECIOS
									const validProductsPrice = productsPrice.filter(
										(prPrice: [number, string]) => prPrice[1] === product.sku
									)
									// VALIDAR FACTORES
									if (validProductsPrice.length >= coupon.factors[0]) {
										/// CALCULAR DESCUENTO
										const productsTotalDiscount: number = validProductsPrice
											.map((vPrPrice: [number, string]) => vPrPrice[0])
											.filter(
												(_price: number, prIndex: number) =>
													prIndex < (coupon.factors ? coupon.factors[0] - coupon.factors[1] : 0)
											)
											.reduce((price: number, nextPrice: number) => price + nextPrice, 0)

										// CALCULAR CANTIDAD DE DESCUENTOS
										return (
											productsTotalDiscount *
											Math.floor(
												validProductsPrice.length / (coupon.factors ? coupon.factors[0] : 1)
											)
										)
									} else return 0
								} else return 0
							})
							.reduce((price: number, nextPrice: number) => price + nextPrice, 0)

						// AGREGAR
						couponDiscount.push(totalDiscount)
					} else {
						if (coupon.factors) {
							// CALCULAR GRUPOS
							const difference: number = coupon.factors[0] - coupon.factors[1]
							const totalFactor: [number, string][] = [...productsPrice]

							// CALCULAR PRECIOS
							let counter = 0
							productsPrice.forEach((_price: [number, string], index: number) => {
								if (counter < difference) {
									totalFactor[index] = [0, '']
									counter++
								} else counter = 0
							})

							// ENVIAR
							const totalDiscount = totalFactor
								.map((vPrPrice: [number, string]) => vPrPrice[0])
								.reduce((price: number, nextPrice: number) => price + nextPrice, 0)
							couponDiscount.push(totalDiscount)
						}
					}
				}
			}
		})

		// RETORNAR DESCUENTOS
		return couponDiscount
	} else return []
}

/**
 * Hook de cupones
 * @description Filtrar cupones aplicables al resumen
 * @param setCurrentCoupon
 * @param formCoupons
 * @param formData
 */
export const getFormCoupons = (
	formCoupons: FormDataCouponsAnswer | undefined,
	components?: BlockComponent[]
): Coupon[] => {
	if (formCoupons) {
		// BUSCAR CUPONES EN FORMULARIO
		const couponsList = Object.keys(formCoupons)
			.map((id: string) => findCouponsById(formCoupons[id], components || []))
			.filter((coupon: Coupon | undefined) => coupon !== undefined) as Coupon[]

		// ACTUALIZAR
		if (couponsList.length > 0) return couponsList
		else return []
	} else return []
}
