import { EditableOptionProps } from '../components/editableOption'

const initialOption: EditableOptionProps = {
	onChange: () => null,
	onClose: () => null,
	onEnter: () => null,
	placeholder: '',
	value: '',
	id: 0,
}

/**
 * Obtener valores filtrados
 * @param optionsList
 * @returns
 */
const getFilteredValues: (optionsList: EditableOptionProps[]) => string[] = (
	optionsList: EditableOptionProps[]
) => [...optionsList].map((option: EditableOptionProps) => (option || { ...initialOption }).value)

/**
 * Filtrar opciones
 * @param optionsList
 * @returns
 */
const cleanEmptys = (optionsList: EditableOptionProps[]) => [...optionsList].filter(Boolean)

/**
 * Agregar opcion
 * @param index
 * @param setOptionsList
 * @param onAddValue
 */
const addOption = (
	index: number,
	setOptionsList: SetState<EditableOptionProps[]>,
	onAddValue?: ((props: keyof BlockComponent) => (values: string[]) => unknown) | undefined
): void => {
	// ACTUALIZAR
	setOptionsList((prevOptions) => {
		// CREAR NUEVO
		const optionsCopy = [...prevOptions]
		const last: EditableOptionProps = optionsCopy[index] || { ...initialOption }
		const newOption: EditableOptionProps = { ...last, value: '', id: last.id + 1 }

		// AGREGAR
		optionsCopy.splice(index + 1, 0, newOption)

		if (onAddValue) onAddValue('values')(getFilteredValues(optionsCopy))
		return cleanEmptys(optionsCopy)
	})
}

/**
 * Eliminar opcion
 * @param key
 * @param setOptionsList
 * @param onAddValue
 */
export const removeOption = (
	key: number,
	setOptionsList: SetState<EditableOptionProps[]>,
	onAddValue?: ((props: keyof BlockComponent) => (values: string[]) => unknown) | undefined
): void => {
	// ACTUALIZAR
	setOptionsList((optionsList) => {
		// ASIGNAR
		const optionsCopy = [...optionsList].filter(
			(_option: EditableOptionProps, index: number) => index !== key
		)

		if (onAddValue) onAddValue('values')(getFilteredValues(optionsCopy))
		return cleanEmptys(optionsCopy)
	})
}

/**
 * Enviar valores
 * @param key
 * @param value
 * @param setOptionsList
 * @param onAddValue
 */
export const sendValues = (
	key: number,
	value: string,
	setOptionsList: SetState<EditableOptionProps[]>,
	onAddValue?: ((props: keyof BlockComponent) => (values: string[]) => unknown) | undefined
): void => {
	setOptionsList((optionsList) => {
		// ASIGNAR
		const optionsCopy = [...optionsList]
		const tmpElm = optionsCopy[key] || { ...initialOption }
		tmpElm.value = value
		optionsCopy[key] = tmpElm

		// ACTUALIZAR
		if (onAddValue) onAddValue('values')(getFilteredValues(optionsCopy))
		return cleanEmptys(optionsCopy)
	})
}

/**
 * Obtener valor por defecto para estado
 * @param values
 * @returns
 */
export const getDefaultValue = (values?: string[]): EditableOptionProps[] =>
	values
		? values?.map((defVal: string, id: number) => ({
				...initialOption,
				value: defVal,
				id,
		  }))
		: [{ ...initialOption }]

export default addOption
