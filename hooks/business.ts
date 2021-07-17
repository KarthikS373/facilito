// TOOLS
import React, { useEffect, MutableRefObject, useRef } from 'react'

// UTILS
import { formsListener, getFormsDifference } from 'utils/forms'
import { getAnswersDifference } from 'utils/answers'
import { getCompany } from 'utils/business'

/**
 * Hook de Business
 * @param  {string|null} userBusiness
 * @param  {boolean} isAnonymous
 * @param  {React.Dispatch<React.SetStateAction<Business|null>>} setBusiness
 * @description Retorna la empresa asociada a un usuario
 */
const useBusiness = (
	userBusiness: string | null,
	isAnonymous: boolean,
	setBusiness: React.Dispatch<React.SetStateAction<Business | null>>
) => {
	// FETCH
	useEffect(() => {
		if (userBusiness && !isAnonymous) getCompany(userBusiness).then(setBusiness)
	}, [userBusiness])
}

// EXPORT
export default useBusiness

// NOTIFICACIONES
/**
 * Hook de notificaciones
 * @description Crea un listener para cambios en formularios o respuestas
 * @param  {(list:FormNotification[])=>unknown} setNotifications
 * @param  {string} companyID?
 */
export const useNotifications = (
	setNotifications: (list: FormNotification[]) => unknown,
	companyID?: string
) => {
	const firstCounter: MutableRefObject<boolean> = useRef(true)
	const formsCopy: MutableRefObject<FormInterface> = useRef({
		forms: [],
		answers: [],
	})

	useEffect(() => {
		// LISTENER
		let listener: EmptyFunction | null = null

		// FORMULARIOS
		const getForms = (formDoc: FormInterface) => {
			// LISTA DE CAMBIOS
			const notificationList: FormNotification[] = []

			// ASIGNAR
			if (firstCounter.current) formsCopy.current = formDoc
			else {
				// OBTENER LONGITUDES
				const ansLength: number = formsCopy.current.forms.length
				const newAnsLength: number = formDoc.forms.length

				// EXISTE UN CAMBIO EN LOS FORMULARIOS
				if (ansLength !== newAnsLength) {
					const formsDifference: Form[] = getFormsDifference(formsCopy.current.forms, formDoc.forms)

					// RECORRER FORMULARIOS NUEVOS/ELIMINADOS
					formsDifference.forEach((form: Form) => {
						// CREAR FORMULARIO
						if (newAnsLength > ansLength)
							notificationList.push({
								title: 'Nuevo formulario',
								body: `Se ha creado el nuevo formulario "${form.title}"`,
							})
						// BORRAR FORMULARIO
						else if (newAnsLength < ansLength) {
							notificationList.push({
								title: 'Formulario borrado',
								body: `Tu formulario "${form.title}" se ha eliminado`,
							})
						}
					})
				}

				// EXISTE UN CAMBIO EN LAS RESPUESTAS
				else {
					const formChanged: FormInterface = getAnswersDifference(
						formsCopy.current.answers,
						formDoc.answers,
						formDoc.forms
					)
					formChanged.forms.forEach((form: Form, index: number) => {
						// DATOS DE LA RESPUESTA
						const name: string =
							formChanged.answers[index]?.data[
								(formChanged.answers[index]?.data.length || 1) - 1
							].personal_name_0.answer.toString() || ''

						if (form)
							// AGREGAR A LA LISTA DE NOTIFICACIONES
							notificationList.push({
								title: 'Nueva respuesta',
								body: `${name} ha respondido el formulario "${form.title}"`,
							})
					})
				}

				// ACTUALIZAR FORMULARIOS
				formsCopy.current = formDoc
				setNotifications(notificationList)
			}

			// REINICIAR
			firstCounter.current = false
		}

		// VERIFICAR EMPRESA
		if (companyID) formsListener(companyID, getForms).then((listen) => (listener = listen))

		// LIMPIAR LISTENER
		return () => {
			if (listener) listener()
		}
	}, [companyID, setNotifications])
}
