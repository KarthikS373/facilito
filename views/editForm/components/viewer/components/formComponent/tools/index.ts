/**
 * Animar borrado
 * @description Animar boton de borrado
 * @param formComponentRef
 * @param enableUnMount
 * @param Styles
 */
export const animateDelete = (
	formComponentRef: React.RefObject<HTMLInputElement>,
	enableUnMount: React.MutableRefObject<boolean>,
	Styles: { [id: string]: string }
): void => {
	// ANIMAR
	if (formComponentRef.current) {
		formComponentRef.current.classList.add(Styles.deleteAnim)
		enableUnMount.current = true
	}
}

/**
 * Animar copiar
 * @description Animar boton de copiar
 * @param formComponentRef
 * @param enableUnMount
 * @param Styles
 */
export const animateCopy = (
	formComponentRef: React.RefObject<HTMLInputElement>,
	enableCopy: React.MutableRefObject<boolean>,
	Styles: { [id: string]: string }
): void => {
	// ANIMAR
	if (formComponentRef.current) {
		formComponentRef.current.classList.add(Styles.copyAnim)
		enableCopy.current = true
	}
}

/**
 * Animar
 * @description Agregar animacion de entrada
 * @param ev
 */
export const handleComponent = (
	ev: React.AnimationEvent,
	formComponentRef: React.RefObject<HTMLInputElement>,
	enableCopy: React.MutableRefObject<boolean>,
	enableUnMount: React.MutableRefObject<boolean>,
	props: FormContainerProps,
	Styles: { [id: string]: string }
): void => {
	ev.persist()
	if (formComponentRef.current && props.onCopy && props.onDelete) {
		if (enableCopy.current) {
			enableCopy.current = false
			formComponentRef.current.classList.remove(Styles.copyAnim)
			props.onCopy()
		} else if (enableUnMount.current) {
			enableUnMount.current = false
			formComponentRef.current.classList.remove(Styles.deleteAnim)
			props.onDelete()
		}
	}
}

/**
 * @description Cambiar estado de obligatorio
 * @param props
 * @param checked
 * @param setRequired
 */
export const onRequired = (
	checked: boolean,
	setRequired: React.Dispatch<React.SetStateAction<boolean>>,
	onRequired?: (required: boolean) => unknown
): void => {
	if (onRequired) onRequired(checked)
	setRequired(checked)
}

/**
 * Enviar componente
 * @description Enviar componente para guardar
 * @param prop
 * @param value
 * @param onChange
 */
const sendComponent = (
	prop: keyof BlockComponent,
	value: React.ChangeEvent | string[],
	onChange?: ((component: keyof BlockComponent, value: FormInputValue) => unknown) | undefined
): void => {
	// INPUT
	let val: string | string[] = ''
	if ('target' in value) {
		const inp: HTMLInputElement = value.target as HTMLInputElement
		val = inp.value.trim()
	} else val = value

	// ENVIAR
	if (onChange) onChange(prop, val)
}

/**
 * No obligatorio
 * @description Evaluar si el componente no deberia ser obligatorio
 * @param name
 * @returns
 */
export const getNotRequired = (name: string): boolean =>
	name === 'title' || name === 'video' || name === 'image' || name === 'geo'

export default sendComponent
