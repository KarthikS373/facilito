// REACT
import React from 'react'

// HOOKS
import useStrings from 'hooks/lang'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// TOOLS
import handleMethods from './tools'

// PROPIEDADES
interface PayMethodsProps {
	setSummaryData: React.Dispatch<React.SetStateAction<FormSummaryData>>
	setFieldValue: (name: string, value: string | null) => unknown
	className?: string
	value: unknown
}

const PayMethods: React.FC<PayMethodsProps> = (props: PayMethodsProps) => {
	// STRINGS
	const { $ } = useStrings()

	// ASIGNAR MÉTODO
	const handleMethodsEv = (ev: SelectChangeEvent) =>
		handleMethods(ev, props.setSummaryData, props.setFieldValue)

	// ENVIAR VALOR POR DEFECTO
	const defPay: string = $`Pago en efectivo`

	return (
		<FormControl component='fieldset' className={props.className}>
			{/* LABEL */}
			<InputLabel id='pay-methods-label-inp'>{$`Método de pago:`}</InputLabel>

			{/* SELECTS */}
			<Select
				id='pay-methods'
				onChange={handleMethodsEv}
				label={$`Método de pago:`}
				labelId='pay-methods-label'
				defaultValue={defPay || ''}
				value={(props.value as string) || defPay}>
				<MenuItem value={$`Pago en efectivo`}>{$`Pago en efectivo`}</MenuItem>
				<MenuItem value={$`Pago con tarjeta`}>{$`Pago con tarjeta`}</MenuItem>
				<MenuItem value={$`Transferencia`}>{$`Transferencia`}</MenuItem>
			</Select>
		</FormControl>
	)
}

export default PayMethods