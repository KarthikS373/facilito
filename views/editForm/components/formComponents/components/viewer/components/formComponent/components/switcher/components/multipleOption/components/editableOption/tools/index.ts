/**
 * Presion tecla de enter
 * @param event
 * @param onEnter
 */
const onEnter = (event: React.KeyboardEvent, onEnter: EmptyFunction): void => {
	if (event.key === 'Enter') {
		event.preventDefault()
		onEnter()
	}
}

/**
 * Enviar opcion
 * @param ev
 * @param onChange
 */
export const sendOptionText = (
	ev: React.ChangeEvent,
	onChange: (value: string) => unknown
): void => {
	// INPUT
	const inp = ev.target as HTMLInputElement

	// ENVIAR
	onChange(inp.value)
}

export default onEnter
