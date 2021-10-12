import type { FieldValues, UseFormSetValue } from 'react-hook-form'

/**
 * Onchange de radios
 * @description Enviar datos de inputs de opcion multiple
 * @param label
 * @param id
 * @param setChecks
 * @param setValue
 */
const onCheckChange = (
	label: string,
	id: string,
	setChecks: React.Dispatch<React.SetStateAction<string[] | undefined>>,
	setValue: UseFormSetValue<FieldValues> | null
): void => {
	setChecks((checks) => {
		// INPUT
		const values: string[] = checks ? [...checks] : [label]

		// AGREGAR
		if (checks) {
			const index = values.indexOf(label)

			// AGREGAR O ELIMINAR
			if (index === -1) values.push(label)
			else values.splice(index, 1)
		}

		// GUARDAR
		if (setValue) setValue(id, values.length === 0 ? undefined : values)
		return values
	})
}

export default onCheckChange
