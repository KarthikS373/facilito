// TOOLS
import { parseDate } from 'utils/tools'

/**
 * Guardar filtro de respuestas
 * @description Guarda en el localStorage el filtro
 * @param  {string} filter
 * @param  {React.Dispatch<React.SetStateAction<string>>} setFilter
 */
export const saveFilter = (
	filter: string,
	setFilter: React.Dispatch<React.SetStateAction<string>>
) => {
	window.localStorage.setItem('answers-filter', filter)
	setFilter(filter)
}

/**
 * Filtrar respuetas
 * @description Reordena lass respuetas segun un filtro
 * @param  {FormAnswerSelf[]} answers
 * @param  {string} filter
 */
export const filterAnswers = (answers: FormAnswerSelf[], filter: string) => {
	const tmpAnswers = [...answers]
	let header: string = filter?.charAt(0) || 'n'
	let field: string = 'personal_name_0'
	let order: string = filter?.substr(1) || 'az'

	// BUSCAR COLUMNA
	if (header === 'n') field = 'personal_name_0'
	else if (header === 't') field = 'total'

	// ORDEN
	const ascOrder: boolean = order === 'az'

	// FILTRO
	tmpAnswers.sort((aF: FormAnswerSelf, bF: FormAnswerSelf) => {
		const a = ascOrder ? aF : bF
		const b = ascOrder ? bF : aF

		if (field === 'i') return aF.index - bF.index
		else if (field === 'n' || field === 't')
			return a.data[field].answer.localeCompare(b.data[field])
		else if (field === 's') return a.state.localeCompare(b.state)
		// @ts-ignore
		else return parseDate(a.date) - parseDate(b.date)
	})

	// ACTUALIZAR
	return tmpAnswers
}

export default filterAnswers
