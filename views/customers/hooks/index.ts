/* eslint-disable react-hooks/exhaustive-deps */
// React
import type { Unsubscribe } from '@firebase/firestore'
import { useEffect } from 'react'
import { customersListener } from 'utils/customers'
import filterCustomers from '../tools'

/**
 * Cuando el filtro o los clientes cambien, actualice los clientes.
 * @param {string} filter - cuerda
 * @param {CustomerSelf[]} customers - CustomerSelf[]
 * @param setCustomers - SetState<CustomerSelf[]>
 */
export const useFilters = (
	filter: string,
	customers: CustomerSelf[],
	setCustomers: SetState<CustomerSelf[]>
): void => {
	useEffect(() => {
		// ACTUALIZAR
		if (customers.length) setCustomers(filterCustomers(customers, filter))
	}, [filter, customers.length, setCustomers])
}

/**
 * UseCustomers es un enlace de React que escucha los cambios en la colección de clientes y actualiza
 * la variable de estado de los clientes.
 * @param setCustomers - React.Dispatch<React.SetStateAction<CustomerSelf[]>>
 * @param {string} companyID - cadena: la identificación de la empresa para obtener clientes
 */
export const useCustomers = (
	forms: FormInterface,
	setCustomers: React.Dispatch<React.SetStateAction<CustomerSelf[]>>,
	companyID?: string
) => {
	useEffect(() => {
		let customersListen: Unsubscribe | null = null
		if (companyID)
			customersListener(companyID, (customers) => {
				setCustomers(
					customers.map((customer) => {
						const form = forms.forms.find((form) => form.id === customer.data.form)

						return {
							...customer,
							data: {
								...customer.data,
								form: form?.title || 'Formulario no encontrado',
							},
						}
					})
				)
			}).then((listen) => (customersListen = listen))

		return () => {
			if (customersListen) customersListen()
		}
	}, [companyID, forms.forms.length, setCustomers])
}
