// REACT
import React, { ChangeEvent, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'

// ENV
import { initialFormData } from 'views/editForm/utils/initials'
import FormContext from '../../../../../../context'
import useStrings from 'hooks/lang'

export const optionsKeys: (keyof FormPersonalData)[] = ['phone', 'email', 'address', 'instructions']

const MultipleInput: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// PROPS
	const props = useContext(FormContext)

	// ESTADO
	const personalOptions = props.personalOptions ?? initialFormData.includePersonalData

	// OBTENER VALORES
	const onChangeOptionEv = (key: keyof FormPersonalData) => (ev: ChangeEvent<HTMLInputElement>) => {
		if (props.onChangePersonalOptions) props.onChangePersonalOptions(key, ev.target.checked)
	}

	const fields = [$`Número de teléfono`, $`Correo electrónico`, $`Dirección`, $`Observaciones`]

	// LISTA DE OPCIONES
	const optionsList = [
		personalOptions.phone,
		personalOptions.email,
		personalOptions.address,
		personalOptions.instructions,
	]

	return (
		<>
			<FormControl
				component='fieldset'
				style={props.active ? { marginBottom: '10px' } : undefined}
				className={Styles.multipleInputs}>
				<FormLabel component='legend'>{$`Preguntar datos personales`}</FormLabel>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox checked color='primary' name='name' disabled />}
						label={$`Nombre`}
					/>
					{fields.map((field: string, key: number) => (
						<FormControlLabel
							key={`multiple_personal_${key}`}
							control={
								<Checkbox
									name={field}
									color='primary'
									checked={optionsList[key]}
									onChange={onChangeOptionEv(optionsKeys[key])}
								/>
							}
							label={field}
						/>
					))}
				</FormGroup>
				<FormHelperText>{$`El nombre es obligatorio`}</FormHelperText>
			</FormControl>
		</>
	)
}

export default MultipleInput
