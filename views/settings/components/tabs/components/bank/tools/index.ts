/**
 * Agregar cuenta
 * @param setAccounts
 */
const addAccount = (setAccounts: SetState<CompanyBankAccount[]>): void => {
	setAccounts((accounts) => {
		const tmpAccounts = [...accounts]
		tmpAccounts.push({
			typeAccount: '',
			nameAccount: '',
			noAccount: '',
			bank: '',
		})

		return tmpAccounts
	})
}

/**
 * Borrar cuenta
 * @param setAccounts
 * @param index
 */
export const deleteAccount = (setAccounts: SetState<CompanyBankAccount[]>, index: number): void => {
	setAccounts((accounts) => {
		const tmpAccounts = [...accounts].filter((_a, key: number) => key !== index)
		return tmpAccounts
	})
}

export default addAccount
