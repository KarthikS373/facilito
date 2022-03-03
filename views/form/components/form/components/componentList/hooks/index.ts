// REACT HOOK FORM
import { useEffect } from 'react'
import { UseFormSetValue, UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form'

/**
 * Registrar componente
 * @param  {UseFormRegister<FieldValues>|null} register
 * @param  {string} name
 * @param  {string|number} id
 * @param  {RegisterOptions<FieldValues>} options?
 */
export const useComponentRegister = (
	register: UseFormRegister<FieldValues> | null,
	name: string,
	id: string | number,
	options?: RegisterOptions<FieldValues>
): void => {
	useEffect(() => {
		if (register) register(`${name}_${id}`, options)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name, id])
}

/**
 * Asignar valor de componente
 * @param  {UseFormSetValue<FieldValues>|null} setValue
 * @param  {string} name
 * @param  {string|number} id
 */
export const setComponentValue =
	(setValue: UseFormSetValue<FieldValues> | null, name: string, id: string | number) =>
	(ev: React.ChangeEvent<HTMLInputElement>): void => {
		// VALOR
		const { value } = ev.target

		// ASIGNAR
		if (setValue) setValue(`${name}_${id}`, value)
	}
