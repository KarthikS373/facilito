// REACT
import { useEffect } from 'react'
import { formsListener } from 'utils/forms'

/**
 * Hook de filtros
 * @description Reordena los formularios con un filtro
 * @param  {string} filter
 * @param  {boolean} hasForms
 * @param  {setForms:(forms:FormInterface)=>unknown} setForms
 */
const useFilter = (
	filter: 'asc' | 'des',
	hasForms: boolean,
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>
) => {
	useEffect(() => {
		if (hasForms)
			setForms((prevForms: FormInterface) => {
				// COPIA
				let tmpForms: Form[] = [...prevForms.forms]
				const tmpAnswers: (FormAnswer | undefined)[] = [...prevForms.answers]

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
				return {
					forms: tmpForms,
					answers: tmpAnswers,
				}
			})
	}, [filter, hasForms])
}

export default useFilter

/**
 * Hook de Formularios
 * @description Retornar todos los formularios de un negocio
 * @param  {(forms: FormInterface) => unknown} setForms
 * @param  {string} companyID
 */
export const useForms = (setForms: (forms: FormInterface) => unknown, companyID?: string) => {
	useEffect(() => {
		// LISTENER
		let listener: EmptyFunction | null = null

		// VERIFICAR EMPRESA
		if (companyID) formsListener(companyID, setForms).then((listen) => (listener = listen))

		// LIMPIAR LISTENER
		return () => {
			if (listener) listener()
		}
	}, [companyID, setForms])
}
