import { useEffect } from 'react'
import { appointmentsListener } from 'utils/events'

/**
 * Hook de eventos
 * @description Actualiza todos los eventos en tiempo real
 * @param  {React.Dispatch<React.SetStateAction<CustomAppointment[]>>} setEvents
 * @param  {string} companyID
 */
const useAppointments = (
	setEvents: React.Dispatch<React.SetStateAction<CustomAppointment[]>>,
	companyID?: string
) => {
	useEffect(() => {
		// LISTENER
		let listener: EmptyFunction | null = null

		// VERIFICAR EMPRESA
		if (companyID) appointmentsListener(companyID, setEvents).then((listen) => (listener = listen))

		// LIMPIAR LISTENER
		return () => {
			if (listener) listener()
		}
	}, [companyID, setEvents])
}

/**
 * Hook de vistas
 * @description Actualiza todos las vistas con responsive
 * @param  {string} viewState
 * @param  {React.Dispatch<React.SetStateAction<string>>}
 */

export const useCalendarView = (
	viewState: string,
	setViewState: React.Dispatch<React.SetStateAction<string>>
) => {
	// CAMBIAR
	useEffect(() => {
		// SELECCIONAR
		const width: number = window.innerWidth
		let selectView: string = viewState

		// CAMBIAR
		if (width > 500) selectView = 'week'
		else selectView = 'day'
		if (width > 730) selectView = viewState

		// ACTUALIZAR
		setViewState(selectView)
	}, [viewState])
}

export default useAppointments
