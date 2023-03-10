import React, { useContext } from 'react'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// ESTILOS
import Styles from '../select/style.module.scss'

// CONTEXTO
import FormContext from '../../../../../../context'
import useStrings from 'hooks/lang'

interface VariableExtrasProps {
	extras: ExtraVariable[]
	selectedVariableExtra: number
	productName: string
	onChange: SetState<number>
}
const VariableExtras: React.FC<VariableExtrasProps> = ({
	productName,
	extras,
	onChange,
	selectedVariableExtra,
}) => {
	// LENGUAJE
	const { $ } = useStrings()

	// MONEDA
	const { badge } = useContext(FormContext)

	// ONCHANGE
	const handleSelect = (ev: SelectChangeEvent) =>
		onChange(parseInt(ev.target.value.toString()) as number)

	return (
		<div style={{ margin: '20px 0px' }}>
			<FormControl className={Styles.selectedExtra} fullWidth required>
				<InputLabel id='variable_extra_self_label'>
					{$`Selecciona`} tu tipo de {productName}
				</InputLabel>
				<Select
					fullWidth
					id='variable_extra_self'
					onChange={handleSelect}
					value={selectedVariableExtra.toString()}
					labelId='variable_extra_self_label'
					label={`${$`Selecciona`} tu tipo de ${productName}`}>
					{extras.map((option: ExtraVariable, exOptIndex: number) => (
						<MenuItem key={`ex_option_${exOptIndex}`} value={exOptIndex}>
							{option.name} {option.price > 0 ? `+${badge}${option.price}` : ''}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}

export default VariableExtras
