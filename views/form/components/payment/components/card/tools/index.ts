// REACT
import React from 'react'

// TIPOS
import type { CardData } from '..'

/**
 * Evento focus
 * @param  {React.FocusEvent<HTMLInputElement>} ev
 * @param  {SetState<CardData>} setState
 * @param  {string} optName?
 */
export const handleInputFocus = (
	ev: React.FocusEvent<HTMLInputElement>,
	setState: SetState<CardData>,
	optName?: string
): void => {
	// ASIGNAR VALOR
	const { name } = ev.target

	// ACTUALIZAR
	setState((prevState: CardData) => ({ ...prevState, focus: optName || name }))
}

/**
 * Change de input de tarjeta
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {SetState<CardData>} setState
 */
export const handleInputChange = (
	ev: React.ChangeEvent<HTMLInputElement>,
	setState: SetState<CardData>
): void => {
	// ASIGNAR VALOR
	const { name, value } = ev.target
	const newValue =
		name === 'number'
			? value.substr(0, 16).trim()
			: name === 'cvc'
			? value.substr(0, 3).trim()
			: value

	// ACTUALIZAR
	setState((prevState: CardData) => ({ ...prevState, [name]: newValue }))
}

/**
 * Fecha de expiracion
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {boolean} isMonth
 * @param  {SetState<string[]>} setExpiry
 * @param  {SetState<CardData>} setState
 */
export const handleExpiry = (
	ev: React.ChangeEvent<HTMLInputElement>,
	isMonth: boolean,
	setExpiry: SetState<string[]>,
	setState: SetState<CardData>
): void => {
	// VALOR
	const value = Math.min(isMonth ? 12 : 100, Math.max(0, +ev.target.value))
	const formatValue: string = value.toString().padStart(2, '0')

	// ACTUALIZAR
	setExpiry((prevData: string[]) => {
		const copy = [...prevData]
		copy[isMonth ? 0 : 1] = value.toString().padStart(2, '0')

		// ACTUALIZAR DATOS DE TARJETA
		setState((prevCard: CardData) => ({
			...prevCard,
			expiry: `${isMonth ? formatValue : copy[0]}/${!isMonth ? formatValue : copy[1]}`,
		}))

		return copy
	})
}
