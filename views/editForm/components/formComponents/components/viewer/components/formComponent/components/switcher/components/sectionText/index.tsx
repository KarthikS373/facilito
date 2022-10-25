// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from '../textInput/style.module.scss'

// MATERIAL
import Input from '@mui/material/Input'

// CONTEXTO
import FormContext from '../../../../../../context'
import useStrings from 'hooks/lang'

interface SectionTextProps {
	isAnchor?: boolean
}

const SectionText: React.FC<SectionTextProps> = (eProps: SectionTextProps) => {
	// STRINGS
	const { $ } = useStrings()

	// FORM PROPS
	const props = useContext(FormContext)

	return (
		<>
			<Input
				required
				placeholder={
					eProps.isAnchor
						? $`Describe el titulo del enlace`
						: $`Describe el titulo de esta sección.`
				}
				defaultValue={props.label}
				className={`${Styles.label} ${props.preview && Styles.labelPreview} ${
					props.preview && Styles.titlePreview
				}`}
				id={`${props.name}_${props.id}`}
				onChange={props.onWrite && props.onWrite('label')}
				inputProps={{ 'aria-label': 'Answer' }}
			/>
			{eProps.isAnchor ? (
				<input
					required
					aria-label='Helper'
					defaultValue={props.href}
					style={{ color: 'var(--blue)' }}
					id={`${props.name}_helper_${props.id}`}
					className={`${Styles.label} ${Styles.helper}`}
					onChange={props.onWrite && props.onWrite('href')}
					placeholder={$`Escribe tu enlace aquí (ej: https://example.com)`}
				/>
			) : (
				<Input
					required
					multiline
					aria-label='Helper'
					defaultValue={props.href}
					placeholder={$`Agrega una descripción`}
					id={`${props.name}_helper_${props.id}`}
					className={`${Styles.label} ${Styles.longHelper}`}
					onChange={props.onWrite && props.onWrite('helper')}
				/>
			)}
		</>
	)
}

export default SectionText
