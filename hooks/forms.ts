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
