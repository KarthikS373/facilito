import type { ExtraLimitedProps } from '..'

/**
 * Opciones restantes
 * @param  {number[]} sizes
 * @param  {number} cant
 * @returns {number}
 */
const computeLeft = (sizes: number[], cant: number): number => {
	// VARIABLES DE CONTEO
	const totalSum: number = sizes.reduce((fSize: number, lSize: number) => +fSize + +lSize, 0)
	const maxSize: number = parseInt(cant.toString(), 10)
	return maxSize - totalSum
}

/**
 * Enviar extra
 * @param  {number[]|undefined} newSize
 * @param  {ExtraLimitedProps} props
 */
export const sendExtra = (newSize: number[] | undefined, props: ExtraLimitedProps): void => {
	// CREAR ITEMS
	const items: ExtraOptionalExt[] | undefined = newSize
		? props.extra.options
				.map((extraOpt: ExtraOptional, exIndex: number) => ({
					name: `${newSize[exIndex]} ${extraOpt.name}`,
					title: props.extra.title,
					price: +newSize[exIndex] * +extraOpt.price,
				}))
				.filter((_e, exIndex: number) => newSize[exIndex] && newSize[exIndex] > 0)
		: undefined

	// ENVIAR
	if (props.onSelect) props.onSelect(items)
}

/**
 * Contadores
 * @param  {number} index
 * @param  {number} cSize
 * @param  {number} maxSize
 * @param  {SetState<number[]>} setSize
 * @param  {ExtraLimitedProps} props
 */
export const handleCounters = (
	index: number,
	cSize: number,
	maxSize: number,
	setSize: SetState<number[]>,
	props: ExtraLimitedProps
): void => {
	// ENVIAR
	setSize((sizes: number[]) => {
		// ASIGNAR
		const newSize = [...sizes].map((size) => size ?? 0)
		newSize[index] = cSize

		// CALCULAR SUMA
		const sum = newSize.reduce((fSize: number, lSize: number) => +(fSize ?? 0) + +(lSize ?? 0), 0)

		// ENVIAR
		if (sum > 0) {
			if (props.extra.required) {
				if (computeLeft(newSize, props.extra.cant || 0) === 0) sendExtra(newSize, props)
				else sendExtra(undefined, props)
			} else sendExtra(newSize, props)
		} else sendExtra(undefined, props)

		// ACTUALIZAR ESTADO
		if (sum <= (maxSize || 0)) return newSize
		else return sizes
	})
}

/**
 * Contadores
 * @param  {ExtraLimitedProps} props
 * @param  {number[]} sizes
 * @returns {number}
 */
export const getTotalPrice = (props: ExtraLimitedProps, sizes: number[]): number =>
	props.extra.options
		.map((exOption: ExtraOptional, optIndex: number) => exOption.price * (sizes[optIndex] || 0))
		.reduce((fPrice, nPrice) => fPrice + nPrice, 0)

export default computeLeft
