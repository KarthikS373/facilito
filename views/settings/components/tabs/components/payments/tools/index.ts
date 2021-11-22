import showCardForm from '../components/newCard'

/**
 * Agregar cuenta
 * @param setAccounts
 */
const addAccount = (setAccounts: SetState<CompanyPaymentAccount[]>): void => {
	// MOSTRAR ALERTA DE CUENTA
	showCardForm((data) => {
		if (data) {
			setAccounts((accounts) => {
				const tmpAccounts = [...accounts]
				tmpAccounts.push({
					main: false,
					...data,
				})

				if (tmpAccounts.every((account) => account.main === false)) tmpAccounts[0].main = true
				return tmpAccounts
			})
		}
	})
}

/**
 * Borrar cuenta
 * @param setAccounts
 * @param index
 */
export const deleteAccount = (
	setAccounts: SetState<CompanyPaymentAccount[]>,
	index: number
): void => {
	setAccounts((accounts) => {
		const tmpAccounts = [...accounts].filter((_a, key: number) => key !== index)
		if (tmpAccounts.every((account) => account.main === false)) tmpAccounts[0].main = true
		return tmpAccounts
	})
}

/**
 * Hacer una cuenta principal
 * @param setAccounts
 * @param index
 */
export const setAccountAsMain = (
	setAccounts: SetState<CompanyPaymentAccount[]>,
	index: number
): void => {
	setAccounts((accounts) => {
		const tmpAccounts = [...accounts].map((account) => ({ ...account, main: false }))
		tmpAccounts[index].main = true
		return tmpAccounts
	})
}

export default addAccount
