/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect } from 'react'
import filterStockRows from '../tools'
import type { Unsubscribe } from '@firebase/firestore'
import { stockListener } from 'utils/stockHistory'

/**
 * Filtra las filas de existencias en función del valor del filtro.
 * @param {string} filter - cuerda
 * @param {StockHistorySelf[]} stockRows - StockHistorySelf[]
 * @param setStockRows - SetState<StockHistorySelf[]>
 */
export const useFilters = (
	filter: string,
	stockRows: StockHistorySelf[],
	setStockRows: SetState<StockHistorySelf[]>
): void => {
	useEffect(() => {
		// ACTUALIZAR
		if (stockRows.length) setStockRows(filterStockRows(stockRows, filter))
	}, [filter, stockRows.length, setStockRows])
}

/**
 * Escucha el historial de acciones de una empresa y establece el estado de las filas de acciones con
 * los datos.
 * @param {FormInterface} forms - Interfaz de formulario
 * @param setStockRows - SetState<StockHistorySelf[]>
 * @param {string} [companyID] - El ID de la empresa a escuchar.
 */
export const useStockRows = (
	forms: FormInterface,
	setStockRows: SetState<StockHistorySelf[]>,
	companyID?: string
) => {
	useEffect(() => {
		let stockListen: Unsubscribe | null = null
		if (companyID)
			stockListener(companyID, (stockRows) => {
				setStockRows(
					stockRows.map((row) => {
						const form = forms.forms.find((form) => form.id === row.formId)
						return {
							...row,
							formId: form?.title || 'Formulario no encontrado',
						}
					})
				)
			}).then((listen) => (stockListen = listen))

		return () => {
			if (stockListen) stockListen()
		}
	}, [companyID, forms.forms.length, setStockRows])
}
