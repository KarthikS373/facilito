// REACT
import React, { RefObject, useContext, useRef } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import TextField from '@mui/material/TextField'

// HOOKS
import FormContext from '../../context'

// REACT HOOK FORM
import { setComponentValue, useComponentRegister } from '../../hooks'
import computeLabelTop from './tools'
import useLabelTop from './hooks'

// PROPIEDADES DE TEXTO
interface TextComponent {
	type?: React.InputHTMLAttributes<unknown>['type']
	isLong?: boolean
	name?: string
	id?: number
}
const TextInput: React.FC<TextComponent> = (eProps: TextComponent) => {
	// REFERENCIA
	const fieldRef: RefObject<HTMLDivElement> = useRef(null)

	// FORM PROPS
	const props = useContext(FormContext)

	// FOCUS Y BLUR
	const computeLabelFocus = () => computeLabelTop(fieldRef, 12)
	const computeLabelBlur = () => !props.value && computeLabelTop(fieldRef, 15)

	// CONFIGURAR ALTO Y MARGENES
	useLabelTop(fieldRef)

	// REGISTRAR
	useComponentRegister(props.register, props.name, props.id, {
		required: props.required,
		validate: (value) => typeof value === 'string',
	})

	return (
		<TextField
			onChange={setComponentValue(props.setValue, props.name, props.id)}
			name={`${eProps.name || props.name}_${eProps.id || props.id}`}
			id={`${eProps.name || props.name}_${eProps.id || props.id}`}
			inputProps={eProps.isLong ? undefined : { maxLength: 60 }}
			helperText={props.helper || undefined}
			className={Styles.textField}
			onFocus={computeLabelFocus}
			required={props.required}
			onBlur={computeLabelBlur}
			multiline={eProps.isLong}
			label={props.label}
			error={props.error}
			variant='standard'
			type={eProps.type}
			defaultValue=''
			color='primary'
			ref={fieldRef}
		/>
	)
}

export default TextInput
