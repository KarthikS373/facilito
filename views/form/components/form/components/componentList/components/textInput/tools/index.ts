/**
 * Calcular tope de label
 * @description Actualizar top
 * @param fieldRef
 * @param margin
 */
const computeLabelTop = (fieldRef: React.RefObject<HTMLDivElement>, margin: number): void => {
	// LABEL
	const label = fieldRef.current?.children[0] as HTMLLabelElement
	const height = 0

	// AJUSTAR LABEL
	label.style.top = `-${height * margin}px`
}

export default computeLabelTop
