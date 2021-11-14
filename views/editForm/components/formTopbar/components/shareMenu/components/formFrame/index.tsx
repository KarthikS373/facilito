// REACT
import React, { ChangeEvent } from 'react'

// HOOKS
import useStrings from 'hooks/lang'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'

// PROPIEDADES
interface FormFrameProps {
	onSize: (w: string, h: string) => unknown
	url: string
}

const FormFrame: React.FC<FormFrameProps> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	// ACTUALIZAR
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		// INPUT
		const inp = event.target as HTMLInputElement
		const val = inp.value

		// ENVIAR
		if (val === 'lit') props.onSize('300', '400')
		else if (val === 'med') props.onSize('500', '700')
		else if (val === 'big') props.onSize('700', '900')
	}

	return (
		<div>
			<FormControl component='fieldset'>
				<FormLabel component='legend'>{$`Selecciona un tamaño`}</FormLabel>
				<RadioGroup aria-label='size' name='formSize' defaultValue='lit' onChange={handleChange}>
					<FormControlLabel value='lit' control={<Radio color='primary' />} label={$`Pequeño`} />
					<FormControlLabel value='med' control={<Radio color='primary' />} label={$`Mediano`} />
					<FormControlLabel value='big' control={<Radio color='primary' />} label={$`Largo`} />
				</RadioGroup>
			</FormControl>
			<div>
				<iframe src={props.url} title='FormPreview' />
			</div>
		</div>
	)
}

export default FormFrame
