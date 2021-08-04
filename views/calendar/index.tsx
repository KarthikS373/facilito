// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import useAppointments from './utils/hooks'

// STRINGS
import useStrings from 'hooks/lang'

// COMPONENTES
import Header from 'components/header'
import Info from './components/info'

// CONTEXTO
import BusinessContext from 'context/business'

// NEXT
import dynamic from 'next/dynamic'
const Scheduler = dynamic(() => import('./components/scheduler'))

const Calendar: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// EMPRESA
	const businessCtx = useContext(BusinessContext)

	// ESTADO
	const [viewState, setViewState] = useState<string>('week')
	const [appointments, setAppointments] = useState<CustomAppointment[]>([])

	// CAMBIAR VISTA
	const handleView = (view: string) => () => setViewState(view)

	// LEER ACTIVIDADES
	useAppointments(setAppointments, businessCtx.business?.id)

	return (
		<>
			<Header customDescription={`${appointments.length} ${$`evento(s) creados.`}`} />
			<Info viewState={viewState} changeView={handleView} />
			<Scheduler viewState={viewState} appointments={appointments} />
		</>
	)
}

export default Calendar
