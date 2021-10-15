// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// CONTEXTO
import FormContext from '../../../../../../context'

// TOOLS
import handleSelect from './tools'

interface ExtraSelectProps {
	onSelect?: (extra: ExtraOptionalExt[]) => unknown
	extra: Extra
}

const ExtraSelect: React.FC<ExtraSelectProps> = ({ extra, onSelect }: ExtraSelectProps) => {
	// ESTADO
	const [selectedExtra, setSelectedExtra] = useState<number | string>('')

	// LENGUAJE
	const { $ } = useStrings()

	// MONEDA
	const { badge } = useContext(FormContext)

	// SELECCIONAR ITEM
	const handleSelectEv = (ev: SelectChangeEvent) =>
		handleSelect(extra, ev, setSelectedExtra, onSelect)

	return (
		<FormControl className={Styles.selectedExtra} fullWidth required={extra.required}>
			<InputLabel id='extra_self_label'>
				{$`Seleccionar`} {extra.title}
			</InputLabel>
			<Select
				fullWidth
				id='extra_self_select'
				onChange={handleSelectEv}
				value={selectedExtra.toString()}
				labelId='extra_self_label_select'
				label={`${$`Seleccionar`} ${extra.title}`}>
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
