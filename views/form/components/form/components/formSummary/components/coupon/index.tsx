// TYPES
import React from 'react'

// TOOLS
import { findCouponsById } from '../../tools'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ICONOS
import Code from '@mui/icons-material/Code'

export const showCouponAlert = (
	$: TemplateStrBuilder,
	setInputCoupon: React.Dispatch<React.SetStateAction<Coupon | null>>,
	setFieldValue: (name: string, value: string | null) => unknown,
	formData?: Form
): void => {
	// VALIDAR CÓDIGO
	let couponCode = ''
	const saveCoupon = (ev: React.ChangeEvent<HTMLInputElement>) =>
		(couponCode = ev.target.value.trim().toUpperCase())

	// ALERTA PRINCIPAL
	window.Alert({
		title: 'Agregar cupón',
		body: 'Escribe aquí el código de tu cupón y recibe una promoción directamente al precio total, solo es posible agregar un cupón por pedido.',
		type: 'confirm',
		onConfirm: () => {
			setTimeout(() => {
				// BUSCAR CUPÓN
				const validCoupon: Coupon | undefined = findCouponsById(
					couponCode,
					formData?.components || []
				)

				// ALERTAS
				if (validCoupon) {
					// VERIFICAR SI NO SE HA USADO UN CUPÓN ANTES
					if (
						formData?.components.some((component: BlockComponent) => {
							if (component.switch_1 && component.coupons)
								return component.coupons.some(
									(coupon: Coupon) => coupon.id.toUpperCase() === couponCode.toUpperCase()
								)
							else return false
						})
					)
						// ALERTA DE CUPÓN EN TIENDA
						window.Alert({
							title: 'Cupón invalido',
							body: 'Este cupón solo se puede seleccionar desde la tienda, busca la sección y seleccionalo para que se aplique tu oferta.',
							onHide: () => setInputCoupon(null),
							type: 'error',
						})
					// AGREGAR CUPÓN
					else {
						setInputCoupon(validCoupon)
						setFieldValue('coupon', validCoupon.id.toUpperCase())
					}
				}

				// EL CÓDIGO DEL CUPÓN NO ES VALIDO
				else
					window.Alert({
						title: 'Cupón invalido',
						body: 'Tu cupón ya no es valido para esta compra o ya caduco',
						onHide: () => setInputCoupon(null),
						type: 'error',
					})
			}, 300)
		},
		customElements: (
			<TextField
				label={$`Código del cupón`}
				inputProps={{ maxLength: 10 }}
				style={{ marginTop: '20px' }}
				placeholder='FRI3NDS'
				onChange={saveCoupon}
				variant='outlined'
				id='coupon-id'
				type='text'
				fullWidth
				name='id'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Code color='primary' />
						</InputAdornment>
					),
				}}
			/>
		),
	})
}
