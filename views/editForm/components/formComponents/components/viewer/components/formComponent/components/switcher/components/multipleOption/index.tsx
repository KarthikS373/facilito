// REACT
import React, { useContext, useState } from 'react'

// ESTILOS
import StylesGlb from '../../../../style.module.scss'
import Styles from './style.module.scss'

// MATERIAL
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'

// COMPONENTES
import EditableOption, { EditableOptionProps } from './components/editableOption'

// ICONOS
import Add from '@mui/icons-material/Add'

// TYPES
import { CheckboxProps } from '@mui/material/Checkbox'
import { RadioProps } from '@mui/material/Radio'

// HOOK
import addOption, { removeOption, sendValues, getDefaultValue } from './tools'
import FormContext from '../../../../../../context'
import useStrings from 'hooks/lang'

// PROPIEDADES
interface MultipleOptionsProps {
	InputElement?: React.FC<CheckboxProps | RadioProps>
}

const FormMultipleOptions: React.FC<MultipleOptionsProps> = (eProps: MultipleOptionsProps) => {
	// STRINGS
	const { $ } = useStrings()

	// FORM PROPS
	const props = useContext(FormContext)

	// ESTADO
	const [optionsList, setOptionsList] = useState<EditableOptionProps[]>(
		getDefaultValue(props.values)
	)

	// AGREGAR OPCIÓN
	const addOptionEv = (index: number) => () => addOption(index, setOptionsList, props.onAddValue)

	// ELIMINAR OPCIÓN
	const removeOptionEv = (key: number) => () => removeOption(key, setOptionsList, props.onAddValue)

	// ACTUALIZAR
	const sendValuesEv = (key: number) => (value: string) =>
		sendValues(key, value, setOptionsList, props.onAddValue)
	return (
		<>
			<Input
				required
				defaultValue={props.label}
				placeholder={
					props.name === 'checkbox'
						? $`Describe el titulo o pregunta para las casillas`
						: $`Describe el titulo o pregunta para las opciones`
				}
				className={`${StylesGlb.label} ${props.preview && StylesGlb.labelPreview} ${
					props.preview && StylesGlb.titlePreview
				}`}
				style={{ height: '35px' }}
				id={`${props.name}_label_${props.id}`}
				onChange={props.onWrite && props.onWrite('label')}
				inputProps={{ 'aria-label': 'Answer' }}
			/>

			{props.required && props.preview && <span className={StylesGlb.requiredSpan}>＊</span>}

			<input
				required
				onChange={props.onWrite && props.onWrite('helper')}
				aria-label='Helper'
				className={`${StylesGlb.label} ${StylesGlb.helper}`}
				placeholder={$`Agrega un texto de ayuda`}
				defaultValue={props.helper}
				id={`${props.name}_helper_${props.id}`}
			/>

			<div className={`${Styles.options} ${props.preview && Styles.optionsPreview}`}>
				{optionsList.map((selectProps: EditableOptionProps, key: number) => (
					<EditableOption
						{...selectProps}
						InputElement={eProps.InputElement}
						id={key}
						key={`${props.name}_item_${props.id}_${key}`}
						placeholder={$`Texto de la opción` + ' ' + (key + 1)}
						onEnter={addOptionEv(key)}
						value={selectProps.value}
						onClose={removeOptionEv(key)}
						onChange={sendValuesEv(key)}
					/>
				))}
			</div>
			{!props.preview && (
				<div className={Styles.addOption}>
					<Button
						startIcon={<Add />}
						variant='contained'
						onClick={addOptionEv(optionsList.length - 1)}>
						{$`Agregar opción`}
					</Button>
				</div>
			)}
		</>
	)
}

export default FormMultipleOptions
