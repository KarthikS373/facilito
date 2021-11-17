// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from '../../../../style.module.scss'

// MATERIAL
import Input from '@mui/material/Input'

// CONTEXTO
import FormContext from 'views/editForm/components/viewer/context'
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
			<input
				required
				aria-label='Helper'
				className={`${Styles.label} ${Styles.helper}`}
				placeholder={
					eProps.isAnchor
						? $`Escribe tu enlace aquí (ej: https://example.com)`
						: $`Agrega una descripción`
				}
				defaultValue={props.href}
				style={props.isAnchor ? { color: 'var(--blue)' } : undefined}
				id={`${props.name}_helper_${props.id}`}
				onChange={props.onWrite && props.onWrite(eProps.isAnchor ? 'href' : 'helper')}
			/>
		</>
	)
}

export default SectionText
