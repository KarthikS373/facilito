/**
 * Enviar cambio descripcion
 * @param ev
 * @param onChangeDescription
 */
const sendDescription = (
	ev: React.ChangeEvent,
	onChangeDescription?: (text: string) => unknown
): void => {
	// INPUT
	const inp = ev.target as HTMLInputElement
	const val: string = inp.value.trim()

	// ENVIAR
	onChangeDescription && onChangeDescription(val)
}

export default sendDescription
