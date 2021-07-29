// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// HOOKS
import { useCalendarView } from '../../utils/hooks'

// ICONOS
import EventAvailableTwoTone from '@material-ui/icons/EventAvailableTwoTone'
import DynamicFeedTwoTone from '@material-ui/icons/DynamicFeedTwoTone'
import DateRangeTwoTone from '@material-ui/icons/DateRangeTwoTone'
import EventNoteTwoTone from '@material-ui/icons/EventNoteTwoTone'
import TodayTwoTone from '@material-ui/icons/TodayTwoTone'

// MATERIAL
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'

// STRINGS
import withStrings from 'hoc/lang'

interface InfoProps {
	viewState: string
	changeView: (view: string) => () => unknown
}
const Info: React.FC<InfoProps> = withStrings(({ $, viewState, changeView }) => {
	// MENU
	const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null)
	const [newViewState, setViewState] = useState<string>()
	const [fixedView, setFixedView] = useState<boolean>(false)

	const openOptionsMenu = Boolean(optionsAnchor)

	// ABRIR
	const handleOptionsMenu = (ev: React.MouseEvent<HTMLElement>) =>
		setOptionsAnchor(ev.currentTarget)

	// CERRAR
	const closeOptionsMenu = () => setOptionsAnchor(null)

	// CAMBIAR
	useCalendarView(viewState, setViewState, setFixedView)

	return (
		<>
			<div className={Styles.container}>
				<div className={Styles.info}>
					<EventAvailableTwoTone />
					<div className={Styles.text}>
						<h2>{$`Calendario y eventos`}</h2>
						<p>{$`Administra los eventos creados desde todos tus formularios.`}</p>
					</div>
				</div>
				<div className={Styles.actions}>
					<Button
						fullWidth
						variant='outlined'
						onClick={fixedView ? undefined : handleOptionsMenu}
						startIcon={<DynamicFeedTwoTone />}>
						{$`Ver como `}
						{(newViewState === 'month' && $`mes`) ||
							(newViewState === 'week' && $`semana`) ||
							(newViewState === 'day' && $`día`) ||
							(newViewState === 'agenda' && $`agenda`)}
					</Button>
				</div>
			</div>
			<PopperMenuList
				style={{ zIndex: 5 }}
				placement='bottom-end'
				open={openOptionsMenu}
				anchorEl={optionsAnchor}
				onClose={closeOptionsMenu}>
				<MenuItem onClick={closeOptionsMenu}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<DateRangeTwoTone />}
						onClick={changeView('month')}>
						{$`Mes`}
					</Button>
				</MenuItem>
				<MenuItem onClick={closeOptionsMenu}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<EventNoteTwoTone />}
						onClick={changeView('week')}>
						{$`Semana`}
					</Button>
				</MenuItem>
				<MenuItem onClick={closeOptionsMenu}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<TodayTwoTone />}
						onClick={changeView('day')}>
						{$`Día`}
					</Button>
				</MenuItem>
				<MenuItem onClick={closeOptionsMenu}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<EventAvailableTwoTone />}
						onClick={changeView('agenda')}>
						{$`Agenda`}
					</Button>
				</MenuItem>
			</PopperMenuList>
		</>
	)
})

export default Info
