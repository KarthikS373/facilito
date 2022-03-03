import { useEffect } from 'react'
import { appointmentsListener } from 'utils/events'

import type { View } from 'react-big-calendar'

/**
 * Hook de eventos
 * @description Actualiza todos los eventos en tiempo real
 * @param  {SetState<CustomAppointment[]>} setEvents
 * @param  {string} companyID
 */
const useAppointments = (setEvents: SetState<CustomAppointment[]>, companyID?: string): void => {
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
 * @param  {View} viewState
 * @param  {SetState<View>} setViewState
 * @param  {SetState<boolean>} setFixedView
 */

export const useCalendarView = (
	viewState: View,
	setViewState: SetState<View>,
	setFixedView?: SetState<boolean>
): void => {
	// CAMBIAR
	useEffect(() => {
		// SELECCIONAR
		const width: number = window.innerWidth
		let selectView: View = viewState
		let fixedView = false

		// CAMBIAR
		if (width > 500) {
			selectView = 'week'
			fixedView = true
		} else {
			selectView = 'day'
			fixedView = true
		}

		if (width > 730) {
			selectView = viewState
			fixedView = false
		}

		// ACTUALIZAR
		setViewState(selectView)
		if (setFixedView) setFixedView(fixedView)
	}, [viewState, setFixedView, setViewState])
}

export default useAppointments
