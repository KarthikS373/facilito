import { useEffect } from 'react'
import { appointmentsListener } from 'utils/events'

import type { View } from 'react-big-calendar'

/**
 * Hook de eventos
 * @description Actualiza todos los eventos en tiempo real
 * @param  {React.Dispatch<React.SetStateAction<CustomAppointment[]>>} setEvents
 * @param  {string} companyID
 */
const useAppointments = (
	setEvents: React.Dispatch<React.SetStateAction<CustomAppointment[]>>,
	companyID?: string
): void => {
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
 * @param  {React.Dispatch<React.SetStateAction<View>>} setViewState
 * @param  {React.Dispatch<React.SetStateAction<boolean>>} setFixedView
 */

export const useCalendarView = (
	viewState: View,
	setViewState: React.Dispatch<React.SetStateAction<View>>,
	setFixedView?: React.Dispatch<React.SetStateAction<boolean>>
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
