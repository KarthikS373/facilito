import { SelectChangeEvent } from '@mui/material'

/**
 * Guardar cambios de cuenta
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {number} index
 * @param  {React.MutableRefObject<Business|null>} businessRef
 */
const onChangeInput = (
	ev: React.ChangeEvent<HTMLInputElement>,
	index: number,
	businessRef: React.MutableRefObject<Business | null>
): void => {
	const { name, value } = ev.target
	if (businessRef.current) {
		const accounts = businessRef.current.bankAccounts ?? []
		accounts[index] = { ...accounts[index], [name]: value }
		businessRef.current.bankAccounts = accounts
	}
}

/**
 * Cambiar tipo de cuenta
 * @param  {SelectChangeEvent} ev
 * @param  {number} index
 * @param  {React.MutableRefObject<Business|null>} businessRef
 */
export const onChangeAccountType = (
	ev: SelectChangeEvent,
	index: number,
	businessRef: React.MutableRefObject<Business | null>
): void => {
	const { value } = ev.target
	if (businessRef.current) {
		const accounts = businessRef.current.bankAccounts ?? []
		accounts[index].typeAccount = value
		businessRef.current.bankAccounts = accounts
	}
}

export default onChangeInput
