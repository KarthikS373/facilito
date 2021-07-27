// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import useAppointments from './utils/hooks'

// STRINGS
import withStrings from 'hoc/lang'

// COMPONENTES
import CustomScheduler from './components/scheduler'
import Header from 'components/header'
import Info from './components/info'

// CONTEXTO
import BusinessContext from 'context/business'

const Calendar: React.FC = withStrings(({ $ }) => {
	// EMPRESA
	const businessCtx = useContext(BusinessContext)

	// ESTADO
	const [viewState, setViewState] = useState<string>('Week')
	const [appointments, setAppointments] = useState<CustomAppointment[]>([])

	// CAMBIAR VISTA
	const handleView = (view: string) => () => setViewState(view)

	// LEER ACTIVIDADES
	useAppointments(setAppointments, businessCtx.business?.id)

	return (
		<>
			<Header customDescription={`${appointments.length} ${$`evento(s) creados.`}`} />
			<Info viewState={viewState} changeView={handleView} />
			<CustomScheduler viewState={viewState} appointments={appointments} />
		</>
	)
})

export default Calendar
