// UTILS
import { getCollection } from './db'
import { parseDate, sendMail } from './tools'

/**
 * Obtener documentos
 * @param  {string} companyID
 * @param  {string} id
 * @description Retorna un documento desde la collection events
 */
const getEventDoc = async (companyID: string, id: string) => {
	// LEER
	const businessCol = await getCollection('business')
	const formDoc = businessCol.doc(companyID).collection('events').doc(id)
	return formDoc
}

/**
 * Remover eventos
 * @param  {string} companyID
 * @param  {string} id
 * @description Remueve todos los eventos de un formulario
 */
export const removeEventForm = async (companyID: string, id: string) => {
	// LEER
	const formDoc = await getEventDoc(companyID, id)
	return await formDoc.delete()
}

/**
 * Borrar eventos
 * @param  {string} companyName
 * @param  {string} companyEmail
 * @param  {string} companyID
 * @param  {string} formId
 * @param  {AppointmentModel} formData
 * @description Remueve todos los eventos de un formulario
 */
export const deleteAppointment = async (
	companyName: string,
	companyEmail: string,
	companyID: string,
	formId: string,
	formData: CustomAppointment
) => {
	// LEER
	const eventDoc = await getEventDoc(companyID, formId)
	const eventFormData = (await eventDoc.get()).data() as EventFormContainer

	if (eventFormData) {
		// BORRAR
		const events = eventFormData.events.filter((appoint: EventAppointment) => {
			const tmpAppoint = { ...appoint }
			tmpAppoint.startDate = parseDate(appoint.startDate)

			// @ts-ignore
			return tmpAppoint.startDate.getTime() !== formData.startDate.getTime()
		})
		eventFormData.events = events

		// ACTUALIZAR
		await eventDoc.set(eventFormData)

		// ENVIAR CORREO
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
 * @description Crea un listener de eventos en la collection events
 */
export const appointmentsListener = async (
	companyID: string,
	setAppointments: (events: CustomAppointment[]) => unknown
) => {
	// LEER
	const businessCol = await getCollection('business')
	const eventsCol = businessCol.doc(companyID).collection('events')

	// LISTENER
	return eventsCol.onSnapshot((snap) => {
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
			const events: CustomAppointment[] = eventsData.map((cEvent: CustomAppointment) => ({
				...cEvent,
				title: '📝 Formulario: ' + cEvent?.title,
				start: parseDate(cEvent.start),
				end: parseDate(cEvent.end),
			}))

			setAppointments(events)
		}
	})
}
