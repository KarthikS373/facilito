import type { SelectChangeEvent } from '@mui/material/Select'

/**
 * Cambiar extra
 * @description Actualiza en la DB y en el contexto las propiedades de un extra
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
 * @description Agregar un opcional en la lista de extra
 * @param  {number} extraIndex
 * @param  {number} optionIndex
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {React.Dispatch<React.SetStateAction<ExtendedOpt[]>>} setOptions
 */
export const addOptional = (
	extraIndex: number,
	optionIndex: number,
	productRef: React.MutableRefObject<Product>,
	setOptions: React.Dispatch<React.SetStateAction<ExtendedOpt[]>>
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
 * @description Remover un opcional en la lista de extra
 * @param  {number} extraIndex
 * @param  {number} optionIndex
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {React.Dispatch<React.SetStateAction<ExtendedOpt[]>>} setOptions
 */
export const removeOptional = (
	extraIndex: number,
	optionIndex: number,
	productRef: React.MutableRefObject<Product>,
	setOptions: React.Dispatch<React.SetStateAction<ExtendedOpt[]>>
): void => {
	setOptions((prevOptions: ExtendedOpt[]) => {
		const newOptions = [...prevOptions].filter((_opt, pos: number) => pos !== optionIndex)
		if (productRef.current.extras) productRef.current.extras[extraIndex].options = newOptions
		return newOptions
	})
}

/**
 * Cambiar tipo de extra
 * @description Edita la propiedad type del extra
 * @param  {number} index
 * @param  {SelectChangeEvent<string>} ev
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {React.Dispatch<React.SetStateAction<number>>} setExtraType
 */
export const changeType = (
	index: number,
	ev: SelectChangeEvent<string>,
	productRef: React.MutableRefObject<Product>,
	setExtraType: React.Dispatch<React.SetStateAction<number>>
): void => {
	const value: number = parseInt(ev.target.value)
	setExtraType(value)
	if (productRef.current.extras) productRef.current.extras[index].type = value
}

export default changeExtraProps