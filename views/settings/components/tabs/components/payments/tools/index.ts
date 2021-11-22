import showCardForm from '../components/newCard'

/**
 * Agregar cuenta
 * @param setAccounts
 */
const addAccount = (
	businessRef: React.MutableRefObject<Business | null>,
	setAccounts: SetState<CompanyPaymentAccount[]>
): void => {
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
				if (businessRef.current) businessRef.current.paymentAccounts = tmpAccounts
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
	businessRef: React.MutableRefObject<Business | null>,
	setAccounts: SetState<CompanyPaymentAccount[]>,
	index: number
): void => {
	setAccounts((accounts) => {
		const tmpAccounts = [...accounts].filter((_a, key: number) => key !== index)
		if (tmpAccounts.every((account) => account.main === false)) tmpAccounts[0].main = true
		if (businessRef.current) businessRef.current.paymentAccounts = tmpAccounts
		return tmpAccounts
	})
}

/**
 * Hacer una cuenta principal
 * @param setAccounts
 * @param index
 */
export const setAccountAsMain = (
	businessRef: React.MutableRefObject<Business | null>,
	setAccounts: SetState<CompanyPaymentAccount[]>,
	index: number
): void => {
	setAccounts((accounts) => {
		const tmpAccounts = [...accounts].map((account) => ({ ...account, main: false }))
		tmpAccounts[index].main = true
		if (businessRef.current) businessRef.current.paymentAccounts = tmpAccounts
		return tmpAccounts
	})
}

export default addAccount
