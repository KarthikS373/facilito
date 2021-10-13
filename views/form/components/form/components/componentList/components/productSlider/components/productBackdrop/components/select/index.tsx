// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import useStrings from 'hooks/lang'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// CONTEXTO
import FormContext from '../../../../../../context'

interface ExtraSelectProps {
	onSelect?: (extra: ExtraOptional[]) => unknown
	extra: Extra
}

const ExtraSelect: React.FC<ExtraSelectProps> = ({ extra, onSelect }: ExtraSelectProps) => {
	// ESTADO
	const [selectedExtra, setSelectedExtra] = useState<number | string>('')

	// BADGE
	const { $ } = useStrings()
	const { badge } = useContext(FormContext)

	// SELECCIONAR ITEM
	const handleSelect = (ev: SelectChangeEvent) => {
		const index: number = parseInt(ev.target.value.toString()) as number
		setSelectedExtra(index)
		onSelect && onSelect([{ name: extra.options[index].name, price: extra.options[index].price }])
	}

	return (
		<FormControl fullWidth required={extra.required}>
			<InputLabel id='extra_self_label'>
				{$`Seleccionar`} {extra.title}
			</InputLabel>
			<Select
				fullWidth
				id='extra_self_select'
				onChange={handleSelect}
				value={selectedExtra.toString()}
				labelId='extra_self_label_select'>
				{extra.options.map((exOption: ExtraOptional, exOptIndex: number) => (
					<MenuItem key={`ex_option_${exOptIndex}`} value={exOptIndex}>
						{exOption.name} {exOption.price > 0 ? `+${badge}${exOption.price}` : ''}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default ExtraSelect
