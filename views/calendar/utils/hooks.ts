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

export default useAppointments
