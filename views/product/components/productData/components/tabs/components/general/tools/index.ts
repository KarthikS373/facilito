import { SelectChangeEvent } from '@mui/material/Select'

/**
 * Actualizar y cambiar categoria
 * @param  {SelectChangeEvent<string>} ev
 * @param  {SetState<string>} setCategory
 * @param  {React.MutableRefObject<Product>} productRef
 */
const changeCategory = (
	ev: SelectChangeEvent<string>,
	setCategory: SetState<string>,
	productRef: React.MutableRefObject<Product>
): void => {
	const { value } = ev.target
	setCategory(value)
	productRef.current.category = value
}

export default changeCategory
