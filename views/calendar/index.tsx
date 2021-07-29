// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import useAppointments from './utils/hooks'

// LINK
import Link from 'next/link'

// STRINGS
import withStrings from 'hoc/lang'

// RUTAS
import ROUTES from 'router/routes'

// ICONOS
import DescriptionTwoTone from '@material-ui/icons/DescriptionTwoTone'

// COMPONENTES
import Header from 'components/header'
import Info from './components/info'

// MATERIAL
import Button from '@material-ui/core/Button'

// CONTEXTO
import BusinessContext from 'context/business'

// NEXT
import dynamic from 'next/dynamic'
const Scheduler = dynamic(() => import('./components/scheduler'))

const Calendar: React.FC = withStrings(({ $ }) => {
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
			<Header customDescription={`${appointments.length} ${$`evento(s) creados.`}`}>
				<Link href={ROUTES.forms}>
					<Button
						color='primary'
						variant='contained'
						style={{ color: '#fff' }}
						startIcon={<DescriptionTwoTone />}>{$`Ir a formularios`}</Button>
				</Link>
			</Header>
			<Info viewState={viewState} changeView={handleView} />
			<Scheduler viewState={viewState} appointments={appointments} />
		</>
	)
})

export default Calendar
