// REACT
import React, { useState, useContext } from 'react'

// ICONOS
import LocalShipping from '@mui/icons-material/LocalShipping'
import Delete from '@mui/icons-material/Delete'
import Add from '@mui/icons-material/Add'

// COMPONENTES
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import showCheckoutAlert from '../..'

// STRINGS
import useStrings from 'hooks/lang'

// TOOLS
import getDefaultState, { addShipping, deleteShipping, setShippingValue } from './tools'
import { FormsContextProps } from 'context/forms'
import type { ShippingPriceExt } from './tools'
import BusinessContext from 'context/business'

// ESTILOS
import Styles from './style.module.scss'

// PROPIEDADES
interface ShippingMethodsProps {
	onChange: (shippingsList: ShippingPrice[]) => unknown
	defaultList?: ShippingPrice[]
}

const ShippingMethods: React.FC<ShippingMethodsProps> = ({ onChange, defaultList }) => {
	// BADGE
	const company = useContext(BusinessContext)

	// SHIPPINGS
	const [shippingsList, setShippingsList] = useState<ShippingPriceExt[]>(
		getDefaultState(defaultList)
	)

	// ASIGNAR VALORES
	const setShippingValueEv =
		(id: number, name: string) => (ev: React.ChangeEvent<HTMLInputElement>) =>
			setShippingValue(id, name, setShippingsList, onChange, ev)

	// AGREGAR INPUTS
	const addShippingEv = (id: number) => () => addShipping(id, setShippingsList, onChange)

	// BORRAR SHIPPING
	const deleteShippingEv = (id: number) => () => deleteShipping(id, setShippingsList, onChange)

	// STRINGS
	const { $ } = useStrings()

	return (
		<>
			<div className={Styles.container}>
				{shippingsList.map((shipping: ShippingPriceExt, index: number) => (
					<div className={Styles.input} key={shipping.id}>
						<TextField
							variant='outlined'
							placeholder='Delivery'
							value={shipping.name ?? ''}
							onChange={setShippingValueEv(index, 'name')}
							label={$`Nombre`}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LocalShipping color='primary' />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							placeholder='0.00'
							type='number'
							variant='outlined'
							value={shipping.price || ''}
							onChange={setShippingValueEv(index, 'price')}
							label={$`Precio`}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<span>
											{company.business?.badge.trim() === 'GTQ'
												? 'Q'
												: company.business?.badge.trim().charAt(0)}
										</span>
									</InputAdornment>
								),
							}}
						/>
						<IconButton
							disabled={index === 0}
							onClick={index > 0 ? deleteShippingEv(index) : undefined}>
							<Delete />
						</IconButton>

						<IconButton onClick={addShippingEv(index)}>
							<Add />
						</IconButton>
					</div>
				))}
			</div>
		</>
	)
}

// ALERTA DE MÉTODOS DE ENVÍO
const showShippingMethods = (
	$: TemplateStrBuilder,
	checkoutSettings: FormCheckout,
	formsCtx: FormsContextProps,
	formData: React.MutableRefObject<Form>,
	business: Business | null,
	saveCheckoutShippings: (shippingsList: ShippingPrice[]) => void,
	onSave: (ctrl: boolean) => unknown
): unknown =>
	window.Alert({
		title: $`Tarifas de envío`,
		hasNextAlert: true,
		body: $`Configura los métodos de envío y precios correspondientes disponibles para tus clientes.`,
		onHide: () => showCheckoutAlert($, formData, formsCtx, business, onSave),
		type: 'confirm',
		customElements: (
			<ShippingMethods
				defaultList={checkoutSettings.shippingPrices}
				onChange={saveCheckoutShippings}
			/>
		),
	})

export default showShippingMethods
