// REACT
import React, { useContext } from 'react'

// MATERIAL/UI
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

// STRINGS
import withStrings from 'hoc/lang'

// ESTILOS
import Styles from './style.module.scss'

// REACT SCHEDULER
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
	Scheduler,
	MonthView,
	DateNavigator,
	DayView,
	WeekView,
	Toolbar,
	Appointments,
	TodayButton,
	AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui'

// HOOKS
import { hourToString } from 'utils/tools'

// CONTEXTO
import BusinessContext from 'context/business'
import UserContext from 'context/user'

// ICONOS
import AccessTimeTwoTone from '@material-ui/icons/AccessTimeTwoTone'
import PersonOutlineTwoTone from '@material-ui/icons/PersonOutlineTwoTone'
import EmailTwoTone from '@material-ui/icons/EmailTwoTone'

// TOOLS
import { deleteAppointment } from 'utils/events'

// COMPONENTE DE APPOINTMENT
// @ts-ignore
const Appointment = ({ data, style, ...restProps }: Appointments.AppointmentProps) => (
	<Appointments.Appointment
		{...restProps}
		data={data}
		style={{
			...style,
			backgroundColor: data.background,
			borderRadius: '10px',
			padding: '5px',
		}}>
		<strong className={Styles.calendar_appoint_title}>{data.title}</strong>
		<span className={Styles.calendar_appoint}>
			<AccessTimeTwoTone />
			{hourToString(data.startDate)} <br />
			{hourToString(data.endDate)}
		</span>
	</Appointments.Appointment>
)

const Content = ({ children, appointmentData, ...restProps }: AppointmentTooltip.ContentProps) => (
	<AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
		<Grid container alignItems='center' className={Styles.calendar_tooltip_userName}>
			<Grid item xs={2}>
				<PersonOutlineTwoTone />
			</Grid>
			<Grid item xs={10}>
				<span>{appointmentData?.name}</span>
			</Grid>
		</Grid>
		{appointmentData?.email && (
			<Grid container alignItems='center' className={Styles.calendar_tooltip_userName}>
				<Grid item xs={2}>
					<EmailTwoTone />
				</Grid>
				<Grid item xs={10}>
					<span>{appointmentData?.email}</span>
				</Grid>
			</Grid>
		)}
	</AppointmentTooltip.Content>
)

const Header =
	(
		$: TemplateStrBuilder,
		userRole: User['role'] | undefined,
		companyName?: string,
		companyEmail?: string,
		companyID?: string
	) =>
	({ children, appointmentData, onHide, ...restProps }: AppointmentTooltip.HeaderProps) => {
		// BORRAR EVENTO
		const deleteAppoint = () => {
			if (userRole === 'admin') {
				if (appointmentData?.id && companyID && companyName && companyEmail) {
					onHide && onHide()
					deleteAppointment(
						companyName,
						companyEmail,
						companyID,
						appointmentData?.id.toString(),
						appointmentData
					)
				}
			} else
				window.Alert({
					title: $`Ocurrió un error`,
					body: $`Solo los administradores de este comercio pueden realizar esta acción, solicita permisos de administrador.`,
					type: 'error',
				})
		}

		// COMPONENTE
		return (
			<AppointmentTooltip.Header
				{...restProps}
				onHide={onHide}
				onDeleteButtonClick={deleteAppoint}
				appointmentData={appointmentData}></AppointmentTooltip.Header>
		)
	}

// PROPS
interface CustomSchedulerProps {
	appointments: CustomAppointment[]
	viewState: string
}
const CustomScheduler: React.FC<CustomSchedulerProps> = withStrings(
	({ $, viewState, appointments }) => {
		// EMPRESA
		const businessCtx = useContext(BusinessContext)

		// USUARIO
		const userCtx = useContext(UserContext)

		return (
			<div className={Styles.container}>
				<Paper>
					<Scheduler locale='es-419' data={appointments}>
						<ViewState defaultCurrentViewName='Week' currentViewName={viewState} />
						<MonthView displayName={$`Mes`} />
						<WeekView displayName={$`Semana`} />
						<DayView displayName={$`Día`} />
						<Toolbar />
						<DateNavigator />
						<TodayButton messages={{ today: $`Hoy` }} />
						<Appointments appointmentComponent={Appointment} />
						<AppointmentTooltip
							showCloseButton
							showDeleteButton
							contentComponent={Content}
							headerComponent={Header(
								$,
								userCtx.user?.role,
								businessCtx.business?.name,
								businessCtx.business?.users ? businessCtx.business?.users[0] : undefined,
								businessCtx.business?.id
							)}
						/>
					</Scheduler>
				</Paper>
			</div>
		)
	}
)

export default CustomScheduler
