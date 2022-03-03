/**
 * Calcular tope de label
 * @param  {React.RefObject<HTMLDivElement>} fieldRef
 * @param  {number} margin
 */
const computeLabelTop = (fieldRef: React.RefObject<HTMLDivElement>, margin: number): void => {
	// LABEL
	const label = fieldRef.current?.children[0] as HTMLLabelElement
	const height = 0

	// AJUSTAR LABEL
	label.style.top = `-${height * margin}px`
}

export default computeLabelTop
