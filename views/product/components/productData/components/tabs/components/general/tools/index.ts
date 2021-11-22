import { SelectChangeEvent } from '@mui/material/Select'

/**
 * Actualizar y cambiar categoria
 * @param ev
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
