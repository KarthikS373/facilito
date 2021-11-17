// REACT
import React, { ChangeEvent, useContext, useState } from 'react'

// ESTILOS
import Styles from '../../../../FormComponent.module.scss'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'

// ENV
import FormContext from 'views/editForm/components/viewer/context'
import useStrings from 'hooks/lang'
import { initialFormData } from 'views/editForm/utils/initials'

const MultipleInput: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// PROPS
	const props = useContext(FormContext)

	// ESTADO
	const [personalOptions, setPersonalOptions] = useState<FormPersonalData>(
		props.personalOptions || initialFormData.includePersonalData
	)

	// OBTENER VALORES
	const onChangeOption = (key: keyof FormPersonalData) => (ev: ChangeEvent<HTMLInputElement>) => {
		// ASIGNAR
		const checked: boolean = ev.target.checked
		const options: FormPersonalData = { ...personalOptions }
		options[key] = checked

		// ENVIAR
		props.onChangePersonalOptions && props.onChangePersonalOptions(options)
		setPersonalOptions(options)
	}

	// LISTA DE OPCIONES
	const optionsList = [
		personalOptions.phone,
		personalOptions.email,
		personalOptions.address,
		personalOptions.instructions,
	]
	const optionsKeys: (keyof FormPersonalData)[] = ['phone', 'email', 'address', 'instructions']
	const fields = [$`Número de teléfono`, $`Correo electrónico`, $`Dirección`, $`Observaciones`]

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
									color='primary'
									checked={optionsList[key]}
									name={field}
									onChange={onChangeOption(optionsKeys[key])}
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
