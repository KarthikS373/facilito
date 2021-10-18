// REACT
import React from 'react'

// TIPOS
import type { CardData } from '..'

/**
 * Evento focus
 * @description Evento focus de input de tarjeta
 * @param optName
 * @returns
 */
export const handleInputFocus = (
	ev: React.FocusEvent<HTMLInputElement>,
	setState: React.Dispatch<React.SetStateAction<CardData>>,
	optName?: string
): void => {
	// ASIGNAR VALOR
	const { name } = ev.target

	// ACTUALIZAR
	setState((prevState: CardData) => ({ ...prevState, focus: optName || name }))
}

/**
 * Evento change
 * @description Actualizar valores de inputs
 * @param ev
 * @param setState
 */
export const handleInputChange = (
	ev: React.ChangeEvent<HTMLInputElement>,
	setState: React.Dispatch<React.SetStateAction<CardData>>
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
 * @description Validar fecha de expiracion de tarjeta
 * @param isMonth
 * @returns
 */
export const handleExpiry = (
	ev: React.ChangeEvent<HTMLInputElement>,
	isMonth: boolean,
	setExpiry: React.Dispatch<React.SetStateAction<string[]>>,
	setState: React.Dispatch<React.SetStateAction<CardData>>
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
