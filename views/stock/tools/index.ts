/* eslint-disable @typescript-eslint/ban-ts-comment */
import { parseDate } from 'utils/tools'

/**
 * Ordena una matriz de objetos por una propiedad dada, en orden ascendente o descendente
 * @param {StockHistorySelf[]} stockRows - StockHistorySelf[]
 * @param {string} filter - cuerda
 * @returns las filas de existencias filtradas.
 */
export const filterStockRows = (
	stockRows: StockHistorySelf[],
	filter: string
): StockHistorySelf[] => {
	const tmpStockRows = [...stockRows]
	const header: string = filter?.charAt(0) || 'n'
	const sort: string = filter?.substr(1) || 'az'

	// ORDEN
	const ascSort: boolean = sort === 'az'

	// FILTRO
	tmpStockRows.sort((aF: StockHistorySelf, bF: StockHistorySelf) => {
		const a = ascSort ? aF : bF
		const b = ascSort ? bF : aF

		if (header === 'n') return a?.data?.product?.name?.localeCompare(b?.data?.product?.name)
		else if (header === 'c') return a?.data?.customer?.name?.localeCompare(b?.data?.customer?.name)
		else if (header === 's') return a?.formId?.localeCompare(b?.formId)
		else if (header === 'i') return +(a?.data?.inputs ?? 0) - +(b?.data?.inputs ?? 0)
		else if (header === 'o') return +(a?.data?.outputs ?? 0) - +(b?.data?.outputs ?? 0)
		// @ts-ignore
		else return parseDate(a.date) - parseDate(b.date)
	})

	// ACTUALIZAR
	return tmpStockRows
}

export default filterStockRows
