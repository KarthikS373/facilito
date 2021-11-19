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
import FormContext from 'views/editForm/components/viewer/context'
import useStrings from 'hooks/lang'

// PROPIEDADES
interface MultipleOptionsProps {
	InputElement?: React.FC<CheckboxProps | RadioProps>
}

// OPTION INITIAL
const initialOption: EditableOptionProps = {
	onChange: () => null,
	onClose: () => null,
	onEnter: () => null,
	placeholder: '',
	value: '',
	id: 0,
}

//	FILTRAR
const getFilteredValues: (optionsList: EditableOptionProps[]) => string[] = (
	optionsList: EditableOptionProps[]
) => [...optionsList].map((option: EditableOptionProps) => (option || { ...initialOption }).value)
const cleanEmptys = (optionsList: EditableOptionProps[]) => [...optionsList].filter(Boolean)

const FormMultipleOptions: React.FC<MultipleOptionsProps> = (eProps: MultipleOptionsProps) => {
	// STRINGS
	const { $ } = useStrings()

	// FORM PROPS
	const props = useContext(FormContext)

	// ESTADO
	const [optionsList, setOptionsList] = useState<EditableOptionProps[]>(
		props.values
			? props.values?.map((defVal: string, id: number) => ({
					...initialOption,
					value: defVal,
					id,
			  }))
			: [{ ...initialOption }]
	)

	// AGREGAR OPCIÓN
	const addOption = (index: number) => () => {
		// CREAR NUEVO
		const optionsCopy = [...optionsList]
		const last: EditableOptionProps = optionsCopy[index] || { ...initialOption }
		const newOption: EditableOptionProps = { ...last, value: '', id: last.id + 1 }

		// AGREGAR
		optionsCopy.splice(index + 1, 0, newOption)

		// ACTUALIZAR
		setOptionsList(cleanEmptys(optionsCopy))
		props.onAddValue && props.onAddValue('values')(getFilteredValues(optionsCopy))
	}

	// ELIMINAR OPCIÓN
	const removeOption = (key: number) => () => {
		// ASIGNAR
		const optionsCopy = [...optionsList].filter(
			(_option: EditableOptionProps, index: number) => index !== key
		)

		// ACTUALIZAR
		setOptionsList(cleanEmptys(optionsCopy))
		props.onAddValue && props.onAddValue('values')(getFilteredValues(optionsCopy))
	}

	// ACTUALIZAR
	const sendValues = (key: number) => (value: string) => {
		// ASIGNAR
		const optionsCopy = [...optionsList]
		const tmpElm = optionsCopy[key] || { ...initialOption }
		tmpElm.value = value
		optionsCopy[key] = tmpElm

		// ACTUALIZAR
		setOptionsList(cleanEmptys(optionsCopy))
		props.onAddValue && props.onAddValue('values')(getFilteredValues(optionsCopy))
	}

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
						onEnter={addOption(key)}
						value={selectProps.value}
						onClose={removeOption(key)}
						onChange={sendValues(key)}
					/>
				))}
			</div>
			{!props.preview && (
				<Button variant='contained' onClick={addOption(optionsList.length - 1)}>
					<Add /> {$`Agregar opción`}
				</Button>
			)}
		</>
	)
}

export default FormMultipleOptions
