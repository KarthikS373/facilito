// REACT
import React, { useContext } from 'react'

// HOOKS
import useStrings from 'hooks/lang'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// CONTEXTO
import FormContext from '../../../../../componentList/context'

// TOOLS
import handleMethods from './tools'

// PROPIEDADES
interface PayMethodsProps {
	setSummaryData: SetState<FormSummaryData>
	setFieldValue: (name: string, value: string | null) => unknown
	shippingPrices?: ShippingPrice[]
	className?: string
	value: string
}

const ShippingMethods: React.FC<PayMethodsProps> = (props: PayMethodsProps) => {
	// STRINGS
	const { $ } = useStrings()

	// FORM CONTEXT
	const form = useContext(FormContext)
	const badge = form.badge || 'GTQ'

	// ASIGNAR MÉTODO
	const handleMethodsEv = (ev: SelectChangeEvent) =>
		handleMethods(ev, props.setSummaryData, props.setFieldValue)

	return (
		<FormControl component='fieldset' className={props.className}>
			{/* LABEL */}
			<InputLabel id='shipping-methods-label-inp'>{$`Tarifas de envío`}</InputLabel>

			{/* SELECTS */}
			<Select
				labelId='shipping-methods-label'
				label={$`Tarifas de envío`}
				onChange={handleMethodsEv}
				value={props.value || ''}
				id='shipping-methods'
				defaultValue={
					props.shippingPrices
						? `${props.shippingPrices[0].name} - ${badge} ${props.shippingPrices[0].price}`
						: ''
				}>
				{props.shippingPrices &&
					props.shippingPrices.map((sMethod: ShippingPrice, key: number) => (
						<MenuItem
							value={`${sMethod.name} - ${badge} ${sMethod.price}`}
							key={`shipping_cart_method_${key}`}>
							{sMethod.name} - {badge} {sMethod.price}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	)
}

export default ShippingMethods
