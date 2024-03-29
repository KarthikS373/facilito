/* eslint-disable @typescript-eslint/ban-ts-comment */
// UTILS
import type { Unsubscribe } from '@firebase/firestore'
import { getCollection } from './db'
import { parseDate, sendMail } from './tools'

/**
 * Obtener documentos
 * @param  {string} companyID
 * @param  {string} id
 */
const getEventDoc = async (companyID: string, id: string) => {
	const { collection, doc } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const eventsCol = collection(businessDoc, 'events')
	const formDoc = doc(eventsCol, id)
	return formDoc
}

/**
 * Remover eventos
 * @param  {string} companyID
 * @param  {string} id
 * @returns {Promise<void>}
 */
export const removeEventForm = async (companyID: string, id: string): Promise<void> => {
	const { deleteDoc } = await import('firebase/firestore')

	// LEER
	const formDoc = await getEventDoc(companyID, id)
	return await deleteDoc(formDoc)
}

/**
 * Borrar eventos
 * @param  {string} companyName
 * @param  {string} companyEmail
 * @param  {string} companyID
 * @param  {string} formId
 * @param  {CustomAppointment} formData
 * @returns {Promise<void>}
 */
export const deleteAppointment = async (
	companyName: string,
	companyEmail: string,
	companyID: string,
	formId: string,
	formData: CustomAppointment
): Promise<void> => {
	const { setDoc, getDoc } = await import('firebase/firestore')

	// LEER
	const eventDoc = await getEventDoc(companyID, formId)
	const eventFormData = (await getDoc(eventDoc)).data() as EventFormContainer

	if (eventFormData) {
		// BORRAR
		const events = eventFormData.events.filter((appoint: EventAppointment) => {
			const tmpAppoint = { ...appoint }
			tmpAppoint.startDate = parseDate(appoint.startDate) || new Date()

			// @ts-ignore
			return tmpAppoint.startDate.getTime() !== formData.startDate.getTime()
		})
		eventFormData.events = events

		// ACTUALIZAR
		await setDoc(eventDoc, eventFormData)

		// ENVIAR CORREO
		if (formData.resource)
			await sendMail(
				`<h1> Hola, ${formData.resource.name} </h1><p> Lamentamos informarte que tu cita de ${
					formData.title
				} para el ${formData.start.toLocaleString(
					'en-GB'
				)} ha sido cancelada, si no has sido notificado de este cambio, comunicate con ${companyName} <a href="${companyEmail}" alt="${companyEmail}" >${companyEmail}.</a></p><br/><strong>Att: Equipo de Facilito APP.</strong>`,
				'Cita cancelada',
				formData.resource.email
			)
	}
}

/**
 * Leer eventos
 * @param  {string} companyID
 * @param  {(events: CustomAppointment[]) => unknown} setAppointments
 * @returns {Promise<Unsubscribe>}
 */
export const appointmentsListener = async (
	companyID: string,
	setAppointments: (events: CustomAppointment[]) => unknown
): Promise<Unsubscribe> => {
	const { collection, doc, onSnapshot } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const eventsCol = collection(businessDoc, 'events')

	// LISTENER
	return onSnapshot(eventsCol, (snap) => {
		// BUSCAR
		const forms = snap.docs.map((docs) => docs.data()) as EventFormContainer[]

		if (forms.length > 0) {
			// ENVIAR
			const eventsData: CustomAppointment[] = forms
				.map((form: EventFormContainer) =>
					form.events.map((event: EventAppointment) => ({
						title: event?.title || '',
						start: event?.startDate || null,
						end: event?.endDate || null,
						resource: {
							background: event?.background || '',
							name: event?.name || '',
							id: event?.id || '',
							email: event?.email || '',
						},
					}))
				)
				.flat()
			const now = new Date()
			const events: CustomAppointment[] = eventsData.map((cEvent: CustomAppointment) => ({
				...cEvent,
				title: '📝 Tienda: ' + cEvent?.title,
				start: parseDate(cEvent.start) || now,
				end: parseDate(cEvent.end) || now,
			}))

			setAppointments(events)
		}
	})
}

/**
 * Guardar eventos
 * @param  {string} companyID
 * @param  {string} formID
 * @param  {EventAppointment[]} eventData
 * @returns {Promise<void>}
 */
export const saveEvents = async (
	companyID: string,
	formID: string,
	eventData: EventAppointment[]
): Promise<void> => {
	const { getDoc, setDoc } = await import('firebase/firestore')

	// LEER
	const eventDoc = await getEventDoc(companyID, formID)
	const eventForm = (await getDoc(eventDoc)).data() as EventFormContainer

	// LEER EVENTOS
	const events = eventForm?.events || []
	eventData.forEach((event: EventAppointment) => events.push(event))

	// GUARDAR
	await setDoc(eventDoc, { events }, { merge: true })
}
