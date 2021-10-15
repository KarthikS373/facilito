// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'

// ICONS
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import CreditCard from '@mui/icons-material/CreditCard'
import MoneyOff from '@mui/icons-material/MoneyOff'

// COMPONENTES
import ProductSidebarList from './components/productSidebarCard'
import ShippingMethods from './components/shippingMethods'
import PayMethods from './components/payMethods'

// REACT HOOK FORM
import { UseFormSetValue, FieldValues } from 'react-hook-form'

// HOOKS
import { useTheme } from '@mui/material/styles'
import useStrings from 'hooks/lang'

// PROPS
interface ProductSidebarProps {
	setSummaryData: React.Dispatch<React.SetStateAction<FormSummaryData>>
	formProducts: FormDataProductSliderAnswer | undefined
	handleDrawer: (open: boolean) => EmptyFunction
	setValue: UseFormSetValue<FieldValues>
	checkoutData: FormCheckoutData
	clickOnSubmit: EmptyFunction
	summaryData: FormSummaryData
	productsCounter: number[]
	isSubmitting: boolean
	openDrawer: boolean
	formData?: Form
}

const ProductSidebar: React.FC<ProductSidebarProps> = (props: ProductSidebarProps) => {
	// STRINGS
	const { $ } = useStrings()

	// BADGE
	const badge = props.formData?.badge || 'GTQ'

	// TEMA
	const theme = useTheme()

	// MOSTRAR IMPUESTO
	const showTaxes: boolean =
		(props.formData?.checkout?.taxesPercentage || 0) > 0 && props.checkoutData.taxesPrice !== 0

	const showCardPrice: boolean =
		props.summaryData.payMethodValue === $`Pago con tarjeta` &&
		(props.formData?.checkout?.cardPercentage || 0) > 0 &&
		props.checkoutData.cardPrice !== 0

	return (
		<>
			{/* BOTÓN SHOPPING CART */}
			<Badge
				color='secondary'
				overlap='circular'
				className={Styles.shoppingBadge}
				badgeContent={props.productsCounter[0]}>
				<IconButton
					onClick={props.handleDrawer(true)}
					className={Styles.shoppingButton}
					style={{ backgroundColor: theme.palette.primary.main }}>
					<ShoppingCart />
				</IconButton>
			</Badge>

			{/* DRAWER */}
			<SwipeableDrawer
				onClose={props.handleDrawer(false)}
				onOpen={props.handleDrawer(true)}
				PaperProps={{ square: false }}
				disableBackdropTransition
				open={props.openDrawer}
				anchor='right'>
				<div className={Styles.shopDrawer}>
					{/* HEADER */}
					<div className={Styles.shopHeader}>
						<ShoppingCart />
						<div>
							<strong>{$`Carrito de compras`}</strong>
						</div>
					</div>

					{/* RESUMEN DE PRODUCTOS */}
					<ProductSidebarList
						totalPrice={props.checkoutData.totalPrice}
						productsCounter={props.productsCounter}
						formProducts={props.formProducts}
						setFieldValue={props.setValue}
						formData={props.formData}
					/>

					{/* PRECIO DE IMPUESTOS */}
					{showTaxes && (
						<div className={Styles.taxOrPercentage}>
							<MoneyOff />
							<span>{$`Porcentaje de impuesto`}</span>{' '}
							{
								<span>
									+ {badge}{' '}
									{props.checkoutData.taxesPrice
										? props.checkoutData.taxesPrice.toFixed(2)
										: '0.00'}
								</span>
							}
						</div>
					)}

					{/* PRECIO DE TARJETA */}
					{showCardPrice && (
						<div className={Styles.taxOrPercentage}>
							<CreditCard />
							<span>{$`Porcentaje de tarjeta`}</span>{' '}
							{
								<span>
									+ {badge}{' '}
									{props.checkoutData.cardPrice ? props.checkoutData.cardPrice.toFixed(2) : '0.00'}
								</span>
							}
						</div>
					)}

					{/* MÉTODOS DE PAGO */}
					<div className={Styles.methods}>
						{props.formData?.checkout?.shippingPrices?.length !== 0 && (
							<ShippingMethods
								shippingPrices={props.formData?.checkout?.shippingPrices}
								value={props.summaryData.shippingMethodValue}
								className={Styles.shippingOrPayMethod}
								setSummaryData={props.setSummaryData}
								setFieldValue={props.setValue}
							/>
						)}
						<PayMethods
							value={props.summaryData.payMethodValue}
							className={Styles.shippingOrPayMethod}
							setSummaryData={props.setSummaryData}
							setFieldValue={props.setValue}
						/>
					</div>

					{/* TOTAL */}
					<div className={Styles.totalPrice}>
						<span>{$`Total de tu orden`}</span>
						<span>{props.checkoutData.totalPrice || `${props.formData?.badge} 0.00`}</span>
					</div>

					{/* BOTÓN DE ENVIAR */}
					<Button
						startIcon={<ReceiptTwoToneIcon />}
						className={Styles.shopSubmit}
						disabled={props.isSubmitting}
						onClick={props.clickOnSubmit}
						variant='contained'
						color='primary'
						type='submit'>
						<span>{$`Enviar`}</span>
					</Button>
				</div>
			</SwipeableDrawer>
		</>
	)
}

export default ProductSidebar
