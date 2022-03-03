/* eslint-disable @typescript-eslint/ban-ts-comment */
// TOOLS
import { parseDate, dateToString } from 'utils/tools'
import { sortAnswers } from 'utils/answers'

/**
 * Filtrar respuestas
 * @description Re ordena las respuestas segun un filtro
 * @param  {FormAnswerSelf[]} answers
 * @param  {string} filter
 */
export const filterAnswers = (answers: FormAnswerSelf[], filter: string): FormAnswerSelf[] => {
	const tmpAnswers = [...answers]
	const header: string = filter?.charAt(0) || 'n'
	let field = 'personal_name_0'
	const sort: string = filter?.substr(1) || 'az'

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
 * @param  {SetState<FormAnswerSelf[]>} setAnswers
 */
export const updateLocalAnswerState = (
	index: number,
	newState: number,
	setAnswers: SetState<FormAnswerSelf[]>
): void => {
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
): FormAnswerItem[] => {
	const answerDataSet: FormAnswerItem[] =
		(answers
			.map((answer: FormAnswerSelf, index: number) => {
				const ansDate: Date | null = parseDate(answer.date)
				const composedAns = [
					{
						quest: $`Fecha de envío`,
						answer: ansDate ? dateToString(ansDate) : '',
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
