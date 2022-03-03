import type { SelectChangeEvent } from '@mui/material/Select'

/**
 * Cambiar extra
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {number} index
 * @param  {React.MutableRefObject<Product>} localProduct
 */
const changeExtraProps = (
	ev: React.ChangeEvent<HTMLInputElement>,
	index: number,
	localProduct: React.MutableRefObject<Product>
): void => {
	// EVENTOS
	const { name, value } = ev.target

	// COPIA
	if (localProduct.current.extras)
		localProduct.current.extras[index] = { ...localProduct.current.extras[index], [name]: value }
}

/**
 * Agregar opcional
 * @param  {number} extraIndex
 * @param  {number} optionIndex
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {SetState<ExtendedOpt[]>} setOptions
 */
export const addOptional = (
	extraIndex: number,
	optionIndex: number,
	productRef: React.MutableRefObject<Product>,
	setOptions: SetState<ExtendedOpt[]>
): void => {
	setOptions((prevOptions: ExtendedOpt[]) => {
		const newOptions = [...prevOptions]
		newOptions.splice(++optionIndex, 0, { name: '', price: 0, id: prevOptions.length })
		if (productRef.current.extras) productRef.current.extras[extraIndex].options = newOptions
		return newOptions
	})
}

/**
 * Remover opcional
 * @param  {number} extraIndex
 * @param  {number} optionIndex
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {SetState<ExtendedOpt[]>} setOptions
 */
export const removeOptional = (
	extraIndex: number,
	optionIndex: number,
	productRef: React.MutableRefObject<Product>,
	setOptions: SetState<ExtendedOpt[]>
): void => {
	setOptions((prevOptions: ExtendedOpt[]) => {
		const newOptions = [...prevOptions].filter((_opt, pos: number) => pos !== optionIndex)
		if (productRef.current.extras) productRef.current.extras[extraIndex].options = newOptions
		return newOptions
	})
}

/**
 * Cambiar tipo de extra
 * @param  {number} index
 * @param  {SelectChangeEvent<string>} ev
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {SetState<number>} setExtraType
 */
export const changeType = (
	index: number,
	ev: SelectChangeEvent<string>,
	productRef: React.MutableRefObject<Product>,
	setExtraType: SetState<number>
): void => {
	const value: number = parseInt(ev.target.value)
	setExtraType(value)
	if (productRef.current.extras) productRef.current.extras[index].type = value
}

export default changeExtraProps
