// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import useStrings from 'hooks/lang'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Checkbox from '@mui/material/Checkbox'

// CONTEXTO
import FormContext from '../../../../../../context'

interface ExtraMultipleProps {
	onSelect?: (extra: ExtraOptional[] | undefined) => unknown
	extra: Extra
}

const ExtraMultiple: React.FC<ExtraMultipleProps> = ({ extra, onSelect }: ExtraMultipleProps) => {
	// ESTADO
	const [checks, setChecks] = useState<boolean[]>(Array(extra.options.length).fill(false))

	// STRINGS
	const { $, langCode } = useStrings()

	// BADGE
	const { badge } = useContext(FormContext)

	// LIMITE
	const selectedChecks = checks.filter((check: boolean) => check === true).length

	// ACTUALIZAR CHECKS
	const handleChecks = (index: number) => (_ev: React.SyntheticEvent, checked: boolean) => {
		setChecks((checks: boolean[]) => {
			// COPIAR Y ASIGNAR
			const currentChecks = [...checks]
			currentChecks[index] = checked

			// LIMITAR A CANTIDAD
			if (extra.cant && extra.cant - selectedChecks === 0) currentChecks[index] = false

			// ITEMS
			const items: ExtraOptional[] = extra.options
				.map((extra: ExtraOptional) => ({ name: extra.name, price: extra.price }))
				.filter((_c, eIndex: number) => currentChecks[eIndex])

			// ENVIAR
			if (onSelect) {
				if (currentChecks.every((check: boolean) => !check)) onSelect(undefined)
				else onSelect(items)
			}

			return currentChecks
		})
	}

	return (
		<FormControl component='fieldset' required={extra.required}>
			<FormGroup>
				{
					<FormLabel style={{ marginTop: '3px' }}>
						{extra.cant
							? `${$`Te queda`} ${extra.cant - selectedChecks}`
							: langCode === 'es'
							? `Agrega ${extra.title}`
							: `Add ${extra.title}`}
					</FormLabel>
				}
				{extra.options.map((exOption: ExtraOptional, exMO: number) => (
					<FormControlLabel
						key={`exMo_${exMO}`}
						onChange={handleChecks(exMO)}
						control={<Checkbox checked={checks[exMO]} name={exOption.name} />}
						label={`${exOption.name} ${exOption.price > 0 ? `+${badge}${exOption.price}` : ''}`}
					/>
				))}
			</FormGroup>
		</FormControl>
	)
}

export default ExtraMultiple
