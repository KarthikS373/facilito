// TOOLS
import { parseDate, dateToString } from 'utils/tools'
import { sortAnswers } from 'utils/answers'

/**
 * Obtener valores de cambio
 * @description Obtiene un numero que activa los efectos
 * @param  {FormInterface} forms
 */
export const getChangesTrigger = (forms: FormInterface) =>
	forms.forms.length +
	forms.answers.length +
	forms.answers.map((answer) => answer?.data.length || 0).reduce((prev, next) => prev + next, 0) +
	forms.answers
		.map((answer) =>
			answer?.states.reduce((state: number, nextState: number) => state + nextState, 0)
		)
		.reduce((prev, next) => prev + next, 0)

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
	let sort: string = filter?.substr(1) || 'az'

	// BUSCAR COLUMNA
	if (header === 'n') field = 'personal_name_0'
	else if (header === 't') field = 'total'

	// ORDEN
	const ascSort: boolean = sort === 'az'

	// FILTRO
	tmpAnswers.sort((aF: FormAnswerSelf, bF: FormAnswerSelf) => {
		const a = ascSort ? aF : bF
		const b = ascSort ? bF : aF

		if (header === 'i') return a.index - b.index
		else if (header === 'n') return a.data[field].answer.localeCompare(b.data[field].answer)
		else if (header === 't')
			return (
				parseFloat(a.data[field]?.answer.split(' ').slice(-1).pop() || '0') -
				parseFloat(b.data[field]?.answer.split(' ').slice(-1).pop() || '0')
			)
		else if (header === 's') return a.stateIndex - b.stateIndex
		// @ts-ignore
		else return parseDate(a.date) - parseDate(b.date)
	})

	// ACTUALIZAR
	return tmpAnswers
}

export default filterAnswers

/**
 * Cambiar estado de repuesta
 * @description Mueve el arreglo state en una fila de respuestas
 * @param  {number} index
 * @param  {number} newState
 * @param  {tracking}
 * @param  {React.Dispatch<React.SetStateAction<FormAnswerSelf[]>>} setAnswers
 */
export const updateLocalAnswerState = (
	index: number,
	newState: number,
	setAnswers: React.Dispatch<React.SetStateAction<FormAnswerSelf[]>>
) => {
	setAnswers((prevAnswers: FormAnswerSelf[]) => {
		// EDITAR
		const tmpAnswers: FormAnswerSelf[] = [...prevAnswers]
		const answer: FormAnswerSelf = prevAnswers[index]
		answer.stateIndex = newState

		// ACTUALIZAR
		tmpAnswers[index] = answer
		return tmpAnswers
	})
}

/**
 * Obtener excel
 * @description Genera el dataset para exportar como xlsx
 * @param  {FormAnswerSelf[]} answers
 * @param  {FormComponent[]} components
 * @param  {TemplateStrBuilder} $
 */
export const getExcelExportData = (
	answers: FormAnswerSelf[],
	components: FormComponent[],
	$: TemplateStrBuilder
) => {
	const answerDataSet: FormAnswerItem[] =
		(answers
			.map((answer: FormAnswerSelf, index: number) => {
				const ansDate: Date = parseDate(answer.date)
				const composedAns = [
					{
						quest: $`Fecha de envío`,
						answer: dateToString(ansDate),
					},
					...sortAnswers(components, answer.data).map((answer: FormSortedAnswer) => answer.answer),
				]
				if (index === 0) return composedAns
				else return [{ quest: '', answer: '' }, ...composedAns]
			})
			.flat()
			.filter(Boolean) as FormAnswerItem[]) || []

	return answerDataSet
}
