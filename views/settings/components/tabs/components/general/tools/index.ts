import { SelectChangeEvent } from '@mui/material/Select'

/**
 * Cambiar y guardar
 * @param {React.ChangeEvent<HTMLInputElement>} ev
 * @param {React.MutableRefObject<Business | null>} businessRef
 */
const onChangeInput = (
	ev: React.ChangeEvent<HTMLInputElement>,
	businessRef: React.MutableRefObject<Business | null>
): void => {
	const { name, value } = ev.target
	if (businessRef.current) businessRef.current[name] = value
}

/**
 * Cambiar y guardar categoria
 * @param {SelectChangeEvent} ev
 * @param {React.MutableRefObject<Business | null>} businessRef
 */
export const onChangeCategory = (
	ev: SelectChangeEvent,
	businessRef: React.MutableRefObject<Business | null>
): void => {
	const value = ev.target.value
	if (businessRef.current) businessRef.current.category = value
}

export default onChangeInput
