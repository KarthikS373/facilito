// REACT
import React, { useState } from 'react'

// TIPOS
import type { View } from 'react-big-calendar'

// HOOKS
import { useCalendarView } from '../../utils/hooks'

// ICONOS
import EventAvailableTwoTone from '@mui/icons-material/EventAvailableTwoTone'
import DynamicFeedTwoTone from '@mui/icons-material/DynamicFeedTwoTone'
import DateRangeTwoTone from '@mui/icons-material/DateRangeTwoTone'
import EventNoteTwoTone from '@mui/icons-material/EventNoteTwoTone'
import TodayTwoTone from '@mui/icons-material/TodayTwoTone'

// MATERIAL
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'
import PageInfo from 'components/pageInfo'

// STRINGS
import useStrings from 'hooks/lang'

interface InfoProps {
	viewState: View
	changeView: (view: View) => () => unknown
}
const Info: React.FC<InfoProps> = ({ viewState, changeView }) => {
	// STRINGS
	const { $ } = useStrings()

	// MENU
	const [optionsAnchor, setOptionsAnchor] = useState<HTMLElement | null>(null)
	const [newViewState, setViewState] = useState<View>('week')
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
			<PageInfo
				title={$`Calendario y eventos`}
				icon={<EventAvailableTwoTone />}
				description={$`Administra los eventos creados desde todos tus formularios.`}>
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
			</PageInfo>
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
}

export default Info
