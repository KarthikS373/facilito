// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from '../../../../FormComponent.module.scss'

// MATERIAL
import Input from '@mui/material/Input'
import useStrings from 'hooks/lang'
import FormContext from 'views/editForm/components/viewer/context'

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
			<input
				required
				onChange={props.onWrite && props.onWrite('helper')}
				aria-label='Helper'
				className={`${Styles.label} ${Styles.helper}`}
				placeholder={$`Agrega un texto de ayuda`}
				defaultValue={props.helper}
				id={`${props.name}_helper_${props.id}`}
			/>
		</>
	)
}

export default TextInput
