/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React, { useEffect, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'
import 'react-phone-number-input/style.css'

// COMPONENTES
import PhoneInput from 'react-phone-number-input'
import CustomPhoneNumber from './components/mui'

// MATERIAL
import type { StandardTextFieldProps } from '@mui/material/TextField'

// UTILS
import { getCountryCode } from 'utils/location'

interface FlagPhoneInputProps
	extends Omit<Partial<StandardTextFieldProps>, 'variant' | 'onChange' | 'placeholder' | 'value'> {
	variant?: 'outlined' | ' filled' | 'standard'
	onChange: (phone: string) => unknown
	placeholder?: string
	value?: string
}

const FlagPhoneInput: React.FC<FlagPhoneInputProps> = (props: FlagPhoneInputProps) => {
	// ESTADO
	const [country, setCountry] = useState<string>('US')

	// PROPIEDADES DEL TEXT FIELD
	const tmpProps = { ...props }

	// @ts-ignore
	delete tmpProps.onChange
	delete tmpProps.value

	// OBTENER CÓDIGO DE PAÍS
	useEffect(() => {
		getCountryCode().then(setCountry)
	}, [])

	return (
		<PhoneInput
			name={props.name}
			value={props.value}
			defaultCountry={country}
			onChange={props.onChange}
			numberInputProps={tmpProps}
			className={props.variant === 'standard' ? Styles.stdContainer : Styles.container}
			placeholder={props.placeholder}
			inputComponent={CustomPhoneNumber}
		/>
	)
}

export default FlagPhoneInput
