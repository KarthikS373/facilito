/**
 * Actualizar titulo
 * @description Enviar cambios de titulo
 * @param ev
 */
const updateTitle = (ev: React.ChangeEvent, onTitle: (title: string) => unknown): void => {
	const inp = ev.target as HTMLInputElement
	const val: string = inp.value
	onTitle(val)
}

export default updateTitle
