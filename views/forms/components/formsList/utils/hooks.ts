// REACT
import { useEffect } from 'react'

/**
 * Hook de filtros
 * @description Reordena los formularios con un filtro
 * @param  {string} filter
 * @param  {number} changesTrigger
 * @param  {setForms:(forms:FormInterface)=>unknown} setForms
 * @param  {FormInterface} prevForms
 */
const useFilter = (
	filter: 'asc' | 'des',
	changesTrigger: number,
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	prevForms: FormInterface
) => {
	useEffect(() => {
		// COPIA
		let tmpForms: Form[] = [...prevForms.forms]
		const tmpAnswers: (FormAnswer | undefined)[] = [...prevForms.answers]

		console.log(prevForms)

		// ORDENAR
		tmpForms.forEach((form: Form, index: number) => {
			const nextAnswer = prevForms.answers[index + 1]
			const nextForm = prevForms.forms[index + 1]
			const answer = prevForms.answers[index]

			if (nextForm) {
				if (
					(filter === 'asc' && form.title.localeCompare(nextForm.title) != -1) ||
					(filter === 'des' && form.title.localeCompare(nextForm.title) != 1)
				) {
					// SWIPE DE FORMULARIOS
					tmpForms[index + 1] = form
					tmpForms[index] = nextForm

					// SWIPE DE RESPUESTAS
					tmpAnswers[index + 1] = answer
					tmpAnswers[index] = nextAnswer
				}
			}
		})

		// RETORNAR
		setForms({
			forms: tmpForms,
			answers: tmpAnswers,
		})
	}, [filter, changesTrigger])
}

export default useFilter
