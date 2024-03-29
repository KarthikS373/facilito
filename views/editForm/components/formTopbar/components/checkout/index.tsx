// STRINGS
import React from 'react'

// COMPONENTES
import showShippingMethods from './components/shippingMethods'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

// ICONOS
import CreditCard from '@mui/icons-material/CreditCard'
import Motorcycle from '@mui/icons-material/CarRental'
import MoneyOff from '@mui/icons-material/MoneyOff'

// TOOLS
import { updateFormProp } from 'views/editForm/tools'
import { FormsContextProps } from 'context/forms'
import defaultSettings from './utils/initials'

// ESTILOS
import Styles from './style.module.scss'

const showCheckoutAlert = (
	$: TemplateStrBuilder,
	formData: React.MutableRefObject<Form>,
	formsCtx: FormsContextProps,
	business: Business | null,
	onSave: (ctrl: boolean) => unknown
): void => {
	// DEFAULT PROPS
	const checkoutSettings: FormCheckout = formData.current.checkout ?? defaultSettings

	// GUARDAR MÉTODOS DE ENVÍO
	const saveCheckoutShippings = (shippingsList: ShippingPrice[]) =>
		(checkoutSettings.shippingPrices = shippingsList)

	// GUARDAR CHECKS
	const handleCheckoutSettings = (name: keyof FormCheckout) => (_ev: unknown, checked: boolean) =>
		(checkoutSettings[name] = checked)

	// GUARDAR INPUTS
	const saveCheckoutInputs = (ev: React.ChangeEvent<HTMLInputElement>) =>
		(checkoutSettings[ev.target.name] = +ev.target.value)

	// ALERTA DE MÉTODOS DE ENVÍO
	const shippingMethods = () =>
		showShippingMethods(
			$,
			checkoutSettings,
			formsCtx,
			formData,
			business,
			saveCheckoutShippings,
			onSave
		)

	// MOSTRAR
	window.Alert({
		title: 'Checkout',
		body: 'Configura el todo comportamiento del carrito, el checkout (resumen de compra) y productos dentro de la tienda.',
		type: 'confirm',
		maxWidth: 520,
		resetOnHide: true,
		onConfirm: () => {
			if (checkoutSettings.registerCustomers)
				updateFormProp(
					'includePersonalData',
					{
						...formData.current.includePersonalData,
						email: true,
					},
					formsCtx,
					formData
				)

			updateFormProp('checkout', checkoutSettings, formsCtx, formData)
			onSave(false)
		},
		customElements: (
			<div style={{ marginTop: 'var(--margin)' }}>
				<FormControl component='fieldset' className={Styles.checkoutOptions}>
					<FormGroup className={Styles.checkoutInputs}>
						<Button
							color='primary'
							variant='contained'
							onClick={shippingMethods}
							startIcon={<Motorcycle />}>
							{$`Tarifas de envío`}
						</Button>
						<TextField
							label={$`Porcentaje de impuesto`}
							variant='outlined'
							fullWidth
							type='number'
							placeholder='0%'
							name='taxesPercentage'
							defaultValue={checkoutSettings.taxesPercentage || ''}
							onChange={saveCheckoutInputs}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<MoneyOff color='primary' />
									</InputAdornment>
								),
							}}
						/>
						{(!business?.permissions || business?.permissions.payments) && (
							<TextField
								label={$`Porcentaje de tarjeta`}
								variant='outlined'
								fullWidth
								type='number'
								placeholder='3%'
								name='cardPercentage'
								defaultValue={checkoutSettings.cardPercentage || ''}
								onChange={saveCheckoutInputs}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<CreditCard color='primary' />
										</InputAdornment>
									),
								}}
							/>
						)}
						<TextField
							label={$`Monto mínimo de compra`}
							variant='outlined'
							fullWidth
							type='number'
							placeholder='0.00'
							name='minimumPurchase'
							defaultValue={checkoutSettings.minimumPurchase || ''}
							onChange={saveCheckoutInputs}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<span>
											{business?.badge.trim() === 'GTQ' ? 'Q' : business?.badge.trim().charAt(0)}
										</span>
									</InputAdornment>
								),
							}}
						/>
					</FormGroup>
					<FormGroup className={Styles.checkoutChecks}>
						<FormControlLabel
							control={
								<Checkbox
									onChange={handleCheckoutSettings('allowSelectCategory')}
									defaultChecked={checkoutSettings.allowSelectCategory}
								/>
							}
							label={$`Acordeon de productos`}
						/>

						<FormControlLabel
							control={
								<Checkbox
									onChange={handleCheckoutSettings('taxesNotIncluded')}
									defaultChecked={checkoutSettings.taxesNotIncluded}
								/>
							}
							label={$`Impuesto no incluido`}
						/>

						<FormControlLabel
							control={
								<Checkbox
									onChange={handleCheckoutSettings('shippingNotIncluded')}
									defaultChecked={checkoutSettings.shippingNotIncluded}
								/>
							}
							label={$`Envío no incluido`}
						/>

						<FormControlLabel
							control={
								<Checkbox
									onChange={handleCheckoutSettings('showSearch')}
									defaultChecked={checkoutSettings.showSearch}
								/>
							}
							label={$`Mostrar buscador`}
						/>

						<FormControlLabel
							control={
								<Checkbox
									onChange={handleCheckoutSettings('registerCustomers')}
									defaultChecked={checkoutSettings.registerCustomers}
								/>
							}
							label={$`Registrar clientes`}
						/>

						<FormControlLabel
							control={
								<Checkbox
									onChange={handleCheckoutSettings('showcaseMode')}
									defaultChecked={checkoutSettings.showcaseMode}
								/>
							}
							label={$`Modo vitrina`}
						/>
					</FormGroup>
				</FormControl>
			</div>
		),
	})
}

export default showCheckoutAlert
