// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Input from '@mui/material/Input'

// TOOLS
import FormContext from '../../../../../../context'
import useStrings from 'hooks/lang'

// PROPIEDADES DE TEXTO
interface TextComponentProps {
	isLong?: boolean
}

const TextInput: React.FC<TextComponentProps> = (eProps) => {
	// STRINGS
	const { $ } = useStrings()

	// FORM PROPS
	const props = useContext(FormContext)

	return (
		<>
			<Input
				placeholder={
					eProps.isLong
						? $`Describe tu pregunta aquí, (Respuesta con caracteres ilimitados)`
						: $`Describe tu pregunta aquí, (Respuesta con máximo de 60 caracteres)`
				}
				required
				defaultValue={props.label}
				className={`${Styles.label} ${props.preview && Styles.labelPreview}`}
				id={`${props.name}_${props.id}`}
				inputProps={{ 'aria-label': 'Answer' }}
				onChange={props.onWrite && props.onWrite('label')}
			/>
			{props.required && props.preview && <span className={Styles.requiredSpan}>＊</span>}
			<Input
				required
				multiline
				onChange={props.onWrite && props.onWrite('helper')}
				aria-label='Helper'
				className={`${Styles.label} ${Styles.longHelper}`}
				placeholder={$`Agrega un texto de ayuda`}
				defaultValue={props.helper}
				id={`${props.name}_helper_${props.id}`}
			/>
		</>
	)
}

export default TextInput
