import { useEffect } from 'react'

import { formsListener } from 'utils/forms'
import { answersListener } from 'utils/answers'

/**
 * Hook de Formularios
 * @description Retornar todos los formularios de un negocio
 * @param  {React.Dispatch<React.SetStateAction<FormInterface>>} setForms
 * @param  {string} companyID
 */
const useForms = (
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	companyID?: string
) => {
	useEffect(() => {
		// LISTENER
		let temporalForms: { [id: string]: Form } = {}
		let formsListen: EmptyFunction | null = null
		let answersListen: EmptyFunction | null = null

		// ACTUALIZAR Y MEZCLAS
		const sendFormInterface =
			(field: keyof FormInterface) => (data: { [id: string]: Form | FormAnswer }) => {
				setForms((prevData: FormInterface) => {
					// FORMUALRIOS
					if (prevData.forms.length === 0 && field === 'forms')
						temporalForms = data as { [id: string]: Form }
					let prevForms =
						prevData.forms.length === 0
							? Object.keys(temporalForms)
							: prevData.forms.map((form: Form) => form.id)

					// RESPUESTAS
					const keys = field === 'answers' ? prevForms : Object.keys(data)

					// MEZCLAR DATOS
					const merged = {
						...prevData,
						answers: keys.map((key: string, index: number) =>
							field === 'answers' ? (data[key] as FormAnswer) : prevData.answers[index]
						),
						forms: keys.map((key: string, index: number) =>
							field === 'forms' ? (data[key] as Form) : prevData.forms[index]
						),
					}

					// ACTUALIZAR
					return merged
				})
			}

		// VERIFICAR EMPRESA
		if (companyID) {
			formsListener(companyID, sendFormInterface('forms')).then((listen) => {
				formsListen = listen
				answersListener(companyID, sendFormInterface('answers')).then(
					(listen) => (answersListen = listen)
				)
			})
		}

		// LIMPIAR LISTENER
		return () => {
			if (formsListen) formsListen()
			if (answersListen) answersListen()
		}
	}, [companyID])
}

export default useForms

/**
 * Hook de filtros
 * @description Reordena los formularios con un filtro
 * @param  {string} filter
 * @param  {string} changesTrigger
 * @param  {setForms:(forms:FormInterface)=>unknown} setForms
 * @param  {FormInterface} prevForms
 */
export const useFormFilter = (
	filter: string,
	changesTrigger: string,
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>,
	prevForms: FormInterface
) => {
	useEffect(() => {
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
		setForms({
			forms: tmpForms,
			answers: tmpAnswers,
		})
	}, [filter, changesTrigger])
}
