// UTILS
import { hourToString, parseDate } from 'utils/tools'
import { deleteAppointment } from 'utils/events'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAl
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

// LINK
import Link from 'next/link'

// ICONS
import DescriptionTwoTone from '@material-ui/icons/DescriptionTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import PersonTwoTone from '@material-ui/icons/PersonTwoTone'

// BORRAR EVENTO
const deleteEvent =
	($: TemplateStrBuilder, business: Business | null, event: CustomAppointment) => () => {
		window.Alert({
			title: $`Borrar evento`,
			type: 'confirm',
			onCancel: () => {
				setTimeout(() => showEventInfo($, business)(event), 300)
			},
			onConfirm: () => {
				deleteAppointment(
					business?.name || '',
					business?.users[0],
					business?.id,
					event.resource.id,
					event
				)
			},
			body: $`¿Estas seguro de querer borrar este evento?, Se notificara al cliente de esta accion permamente.`,
		})
	}

// MOSTRAR INFORMACION
export const showEventInfo =
	($: TemplateStrBuilder, business: Business | null) => (event: CustomAppointment) => {
		window.Alert({
			title: '',
			body: '',
			type: 'alert',
			confirmText: $`Cerrar`,
			customElements: (
				<div className={Styles.container}>
					<h3>{event.title}</h3>
					<p>
						{$`Programado el:`} {parseDate(event.start).toLocaleDateString('en-GB')}
					</p>
					<p>
						<span>
							{$`Desde`} {hourToString(event.start)},
						</span>
						<span>
							{' '}
							{$`hasta`} {hourToString(event.start)}
						</span>
					</p>
					<hr />
					<div className={Styles.userInfo}>
						<PersonTwoTone />
						<div>
							<p>{event.resource.name}</p>
							<a href={`mailto:${event.resource.email}`} title={event.resource.email}>
								{event.resource.email}
							</a>
						</div>
					</div>
					<div className={Styles.actions}>
						<Link href={`/f/${event.resource.id}`}>
							{(window.innerWidth > 500 && (
								<Button variant='outlined' startIcon={<DescriptionTwoTone />}>
									{$`Formulario`}
								</Button>
							)) ||
								(window.innerWidth <= 500 && (
									<IconButton>
										<DescriptionTwoTone />
									</IconButton>
								))}
						</Link>
						{(window.innerWidth > 500 && (
							<Button
								variant='outlined'
								onClick={deleteEvent($, business, event)}
								startIcon={<DeleteTwoTone />}>
								{$`Eliminar`}
							</Button>
						)) ||
							(window.innerWidth <= 500 && (
								<IconButton onClick={deleteEvent($, business, event)}>
									<DeleteTwoTone />
								</IconButton>
							))}
					</div>
				</div>
			),
		})
	}

const CustomEvent: React.FC<{ event: CustomAppointment }> = ({ event }) => {
	return (
		<span>
			<strong>{event.title.split(':')[1]}</strong>
		</span>
	)
}

export default CustomEvent
