import React from 'react'

// UTILS
import { hourToString, parseDate } from 'utils/tools'
import { deleteAppointment } from 'utils/events'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAl
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

// COMPONENTES
import Link from 'components/link'

// ICONS
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone'
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'
import PersonTwoTone from '@mui/icons-material/PersonTwoTone'

// BORRAR EVENTO
const deleteEvent =
	(
		$: TemplateStrBuilder,
		business: Business | null,
		event: CustomAppointment,
		role: User['role']
	) =>
	() => {
		if (role === 'admin') {
			window.Alert({
				title: 'Borrar evento',
				type: 'confirm',
				body: '¿Estas seguro de querer borrar este evento?, Se notificara al cliente de esta accion permanente.',
				hasNextAlert: true,
				onCancel: () => showEventInfo($, business, role)(event),
				onConfirm: () => {
					deleteAppointment(
						business?.name || '',
						business?.users ? business?.users[0] : '',
						business?.id || '',
						event.resource?.id || '',
						event
					)
				},
			})
		} else
			window.Alert({
				title: 'Ocurrió un error',
				body: 'Actualmente no tienes los permisos necesarios para acceder a esta funcionalidad.',
				type: 'error',
				onHide: () => showEventInfo($, business, role)(event),
			})
	}

// MOSTRAR INFORMACION
export const showEventInfo =
	($: TemplateStrBuilder, business: Business | null, role: User['role']) =>
	(event: CustomAppointment): void => {
		window.Alert({
			title: '',
			body: '',
			type: 'alert',
			confirmText: 'Cerrar',
			customElements: (
				<div className={Styles.container}>
					<h3>{event.title}</h3>
					<p>
						{$`Programado el:`} {parseDate(event.start)?.toLocaleDateString('en-GB') || ''}
					</p>
					<p>
						<span>
							{$`Desde`} {hourToString(event.start)},
						</span>
						<span>
							{' '}
							{$`hasta`} {hourToString(event.end)}
						</span>
					</p>
					<hr />
					<div className={Styles.userInfo}>
						<PersonTwoTone />
						<div>
							<p>{event.resource?.name}</p>
							<a href={`mailto:${event.resource?.email}`} title={event.resource?.email}>
								{event.resource?.email}
							</a>
						</div>
					</div>
					<div className={Styles.actions}>
						<Link rKey='newForm' id={event.resource?.id}>
							{(window.innerWidth > 500 && (
								<Button variant='outlined' startIcon={<DescriptionTwoTone />}>
									{$`Tienda`}
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
								onClick={deleteEvent($, business, event, role)}
								startIcon={<DeleteTwoTone />}>
								{$`Eliminar`}
							</Button>
						)) ||
							(window.innerWidth <= 500 && (
								<IconButton onClick={deleteEvent($, business, event, role)}>
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
