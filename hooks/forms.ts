import { useEffect, useContext } from 'react'

import { formsListener } from 'utils/forms'
import { answersListener } from 'utils/answers'

import FormsContext from 'context/forms'

/**
 * Hook de tiendas
 * @param  {SetState<FormInterface>} setForms
 * @param  {string} companyID
 */
const useForms = (setForms: SetState<FormInterface>, companyID?: string): void => {
	useEffect(() => {
		// LISTENER
		let temporalForms: Record<string, Form> = {}
		let formsListen: EmptyFunction | null = null
		let answersListen: EmptyFunction | null = null

		// ACTUALIZAR Y MEZCLAS
		const sendFormInterface =
			(field: keyof FormInterface) => (data: Record<string, Form | FormAnswer>) => {
				setForms((prevData: FormInterface) => {
					// TIENDAS
					if (prevData.forms.length === 0 && field === 'forms')
						temporalForms = data as Record<string, Form>
					const prevForms =
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
	}, [companyID, setForms])
}

export default useForms

/**
 * Hook de filtros
 * @param  {string} filter
 * @param  {SetState<FormInterface>} setForms
 * @param  {FormInterface} prevForms
 */
export const useFormFilter = (
	filter: string,
	setForms: SetState<FormInterface>,
	prevForms: FormInterface
): void => {
	useEffect(() => {
		// COPIA
		const tmpForms: Form[] = [...prevForms.forms]
		const tmpAnswers: (FormAnswer | undefined)[] = [...prevForms.answers]

		// ORDENAR
		tmpForms.forEach((form: Form, index: number) => {
			const nextAnswer = prevForms.answers[index + 1]
			const nextForm = prevForms.forms[index + 1]
			const answer = prevForms.answers[index]

			if (nextForm) {
				if (
					(filter === 'asc' && form.title.localeCompare(nextForm.title) !== -1) ||
					(filter === 'des' && form.title.localeCompare(nextForm.title) !== 1)
				) {
					// SWIPE DE TIENDAS
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
	}, [filter, prevForms.answers, prevForms.forms, setForms])
}

/**
 * Hook de tienda
 * @param  {string} formID
 * @param  {Form[]} customForms?
 * @returns {Form}
 */
export const useForm = (formID: string, customForms?: Form[]): Form | undefined => {
	// CONTEXTO
	let forms: Form[] = useContext(FormsContext).forms.forms
	if (customForms) forms = customForms
	const currentForm: Form | undefined = forms.find((form) => form.id === formID)
	return currentForm
}

/**
 * Hook de fondo de tienda
 * @param {string} background
 */
export const useFormBackground = (background?: string): void => {
	// COLOR DE FONDO
	useEffect(() => {
		document.body.style.background = background?.startsWith('transparent linear-gradient')
			? background
			: `no-repeat center/cover url(${background})`
		document.body.style.backgroundAttachment = 'fixed'
		document.body.style.backgroundSize = 'cover'
	})
}
