// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// HOOKS
import { useSendTotalPrice, useFormCoupons } from './hooks'
import useStrings from 'hooks/lang'

// REACT-HOOK-FORM
import { UseFormSetValue, FieldValues } from 'react-hook-form'

// COMPONENTES
import ShippingMethods from './components/productSidebar/components/shippingMethods'
import PayMethods from './components/productSidebar/components/payMethods'
import ProductSidebar from './components/productSidebar'
import { showCouponAlert } from './components/coupon'

// ICONOS
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import MoneyOff from '@mui/icons-material/MoneyOff'

// TOOLS
import { computeCoupon } from './tools'

// PROPS
interface FormSummaryProps {
	formProducts: FormDataProductSliderAnswer | undefined
	formCoupons: FormDataCouponsAnswer | undefined
	setValue: UseFormSetValue<FieldValues>
	clickOnSubmit: EmptyFunction
	productsCounter: number[]
	subTotalPrice: number
	isSubmitting: boolean
	cartItems: number
	formData?: Form
}

const FormSummary: React.FC<FormSummaryProps> = (props: FormSummaryProps) => {
	// CUPONES DE SELECTS
	const [currentCoupon, setCurrentCoupon] = useState<(Coupon | null)[]>([null])

	// CUPONES DE INPUT
	const [inputCoupon, setInputCoupon] = useState<Coupon | null>(null)

	// DRAWER
	const [openDrawer, setOpenDrawer] = useState<boolean>(false)

	// DATOS DE RESUMEN
	const [summaryData, setSummaryData] = useState<FormSummaryData>({
		shippingMethodValue: '',
		payMethodValue: '',
	})

	// STRINGS
	const { $ } = useStrings()

	// MONEDA
	const badge = props.formData?.badge || 'GTQ'

	// PROPS
	const { subTotalPrice, setValue, formData } = props

	// PRECIO DE LOS IMPUESTOS
	const taxesPrice: number = subTotalPrice * ((formData?.checkout?.taxesPercentage || 0) / 100)

	// PRECIO DEL ENVIÓ
	const shippingPriceSelect: string | undefined = summaryData.shippingMethodValue.split(' - ')[1]

	// PRECIO TOTAL DE ENVIO
	const shippingPrice: number = props.formData?.checkout?.shippingPrices?.length
		? shippingPriceSelect
			? +shippingPriceSelect.replace(badge, '')
			: 0
		: 0

	// PRECIO DE LA TARJETA
	const cardPrice: number =
		summaryData.payMethodValue === $`Pago con tarjeta`
			? subTotalPrice * ((formData?.checkout?.cardPercentage || 0) / 100)
			: 0

	// PRECIO DE CUPÓN Y TOTAL
	const couponDiscount: number[] = computeCoupon(
		props.formProducts,
		[...currentCoupon, inputCoupon],
		subTotalPrice + cardPrice + taxesPrice
	)

	// CALCULAR TOTAL DE DESCUENTO
	const discountTotal: number = couponDiscount.reduce(
		(discount: number, nextDisc: number) => discount + nextDisc,
		0
	)

	// STRING DE TOTAL
	const totalText = `${badge} ${(
		subTotalPrice -
		discountTotal +
		taxesPrice +
		cardPrice +
		shippingPrice
	).toFixed(2)}`

	// ALERTA DE CUPONES
	const showCouponAlertEv = () => showCouponAlert($, setInputCoupon, setValue, formData)

	// ABRIR O CERRAR DRAWER
	const handleDrawer = (open: boolean) => () => setOpenDrawer(open)

	// ASIGNAR CUPONES QUE VIENEN DE SELECTS
	useFormCoupons(setCurrentCoupon, props.formCoupons, formData)

	// ENVIAR TOTAL A FORM
	useSendTotalPrice(
		setValue,
		badge,
		subTotalPrice,
		discountTotal,
		taxesPrice,
		cardPrice,
		shippingPrice
	)

	return (
		<>
			<ProductSidebar
				checkoutData={{ cardPrice, shippingPrice, taxesPrice, totalPrice: totalText }}
				productsCounter={props.productsCounter}
				clickOnSubmit={props.clickOnSubmit}
				formProducts={props.formProducts}
				isSubmitting={props.isSubmitting}
				setSummaryData={setSummaryData}
				handleDrawer={handleDrawer}
				setValue={props.setValue}
				formData={props.formData}
				summaryData={summaryData}
				openDrawer={openDrawer}
			/>
			{props.formProducts && Object.values(props.formProducts).filter(Boolean).length > 0 && (
				<div className={Styles.jagged}>
					<h2>{$`Resumen de orden`}</h2>
					<ul>
						{/* TÍTULOS */}
						<li>
							<span>{$`Descripción`}</span>
							<span>{$`Valor`}</span>
						</li>

						{/* ITEMS DE CARRITO */}
						<li>
							<span onClick={handleDrawer(true)}>
								{$`Items en carrito`} ({props.cartItems})
							</span>
							<span>
								+ {badge} {subTotalPrice.toFixed(2)}
							</span>
						</li>

						{/* PRECIO DE IMPUESTOS */}
						{formData?.checkout?.taxesPercentage !== 0 && taxesPrice !== 0 && (
							<li>
								<span>{$`Porcentaje de impuesto`}</span>
								<span>
									+ {badge} {taxesPrice.toFixed(2)}
								</span>
							</li>
						)}

						{/* PRECIO DE TARJETA */}
						{summaryData.payMethodValue === $`Pago con tarjeta` &&
							formData?.checkout?.cardPercentage !== 0 &&
							cardPrice !== 0 && (
								<li>
									<span>{$`Porcentaje de tarjeta`}</span>
									<span>
										+ {badge} {cardPrice.toFixed(2)}
									</span>
								</li>
							)}

						{/* PRECIO DE DELIVERY */}
						{formData?.checkout?.shippingPrices &&
							formData?.checkout?.shippingPrices?.length !== 0 &&
							summaryData.shippingMethodValue && (
								<li>
									<span>
										{summaryData.shippingMethodValue
											? summaryData.shippingMethodValue.split(' - ')[0]
											: ''}
									</span>
									<span>
										+{' '}
										{summaryData.shippingMethodValue
											? summaryData.shippingMethodValue.split(' - ')[1]
											: ''}
									</span>
								</li>
							)}

						{/* LISTA DE CUPONES */}
						{currentCoupon.map((coupon: Coupon | null, index: number) =>
							coupon ? (
								<li key={`coupon_summary_${index}`}>
									<span>{coupon ? coupon.id : $`¿Tienes un cupón?`}</span>
									{currentCoupon && (
										<span>
											- {badge} {couponDiscount[index].toFixed(2)}
										</span>
									)}
								</li>
							) : null
						)}

						{/* INPUT DE CUPÓN */}
						<li>
							<span onClick={showCouponAlertEv}>
								{inputCoupon ? inputCoupon.id : $`¿Tienes un cupón?`}
							</span>
							{inputCoupon && (
								<span>
									- {badge} {couponDiscount[couponDiscount.length - 1].toFixed(2)}
								</span>
							)}
						</li>
					</ul>

					{/* MÉTODOS DE ENVÍO Y PAGO */}
					<div className={Styles.checkSettings}>
						{formData?.checkout?.shippingPrices &&
							formData?.checkout?.shippingPrices?.length !== 0 && (
								<ShippingMethods
									shippingPrices={formData?.checkout?.shippingPrices}
									value={summaryData.shippingMethodValue}
									className={Styles.shippingMethods}
									setSummaryData={setSummaryData}
									setFieldValue={setValue}
								/>
							)}

						<PayMethods
							value={summaryData.payMethodValue}
							setSummaryData={setSummaryData}
							className={Styles.payMethods}
							setFieldValue={setValue}
						/>
					</div>

					{/* MENSAJES DE IMPUESTO/ENVÍO NO INCLUIDOS */}
					<div className={Styles.taxes}>
						{formData?.checkout?.taxesNotIncluded && (
							<p>
								<MoneyOff /> {$`Impuesto no incluido`}
							</p>
						)}
						{formData?.checkout?.shippingNotIncluded && (
							<p>
								<LocalShippingOutlinedIcon /> {$`Envío no incluido`}
							</p>
						)}
					</div>

					{/* PRECIO TOTAL */}
					<div className={Styles.totalPrice}>
						<span>{$`Total de tu orden`}</span>
						<span>{totalText}</span>
					</div>
				</div>
			)}
		</>
	)
}

export default FormSummary
