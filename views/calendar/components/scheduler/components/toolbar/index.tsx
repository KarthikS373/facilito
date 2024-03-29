/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react'
import type { ToolbarProps } from 'react-big-calendar'

// ESTILOS
import Styles from './style.module.scss'

// STRINGS
import useStrings from 'hooks/lang'

// MATERIAL
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

// ICONS
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone'
import ChevronLeftTwoTone from '@mui/icons-material/ChevronLeftTwoTone'
import EventTwoTone from '@mui/icons-material/EventTwoTone'

// eslint-disable-next-line @typescript-eslint/ban-types
const CustomToolbar: React.FC<ToolbarProps<Event, object>> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	const [width, setWidth] = useState<number>(0)

	// REGRESAR
	const goToBack = () => {
		if (props.view === 'month') props.date.setMonth(props.date.getMonth() - 1)
		else if (props.view === 'week') props.date.setDate(props.date.getDate() - 7)
		else if (props.view === 'day' || props.view === 'agenda')
			props.date.setDate(props.date.getDate() - 1)
		// @ts-ignore
		props.onNavigate('prev')
	}

	// AVANZAR
	const goToNext = () => {
		if (props.view === 'month') props.date.setMonth(props.date.getMonth() + 1)
		else if (props.view === 'week') props.date.setDate(props.date.getDate() + 7)
		else if (props.view === 'day' || props.view === 'agenda')
			props.date.setDate(props.date.getDate() + 1)
		// @ts-ignore
		props.onNavigate('next')
	}

	// IR A HOY
	const goToCurrent = () => {
		const now = new Date()
		props.date.setDate(now.getDate())
		props.date.setMonth(now.getMonth())
		// @ts-ignore
		props.date.setYear(now.getFullYear())
		// @ts-ignore
		props.onNavigate('current')
	}

	const newLabel: string[] = props.label.split(' ')

	useEffect(() => {
		setWidth(window.innerWidth)
	}, [])

	return (
		<div className={Styles.container}>
			<div>
				{width > 500 && (
					<Button variant='outlined' onClick={goToCurrent} startIcon={<EventTwoTone />}>
						{$`Hoy`}
					</Button>
				)}
				{width < 500 && (
					<IconButton onClick={goToCurrent}>
						<EventTwoTone />
					</IconButton>
				)}
				<IconButton size={width < 500 ? 'small' : 'medium'} onClick={goToBack}>
					<ChevronLeftTwoTone />
				</IconButton>
				<IconButton size={width < 500 ? 'small' : 'medium'} onClick={goToNext}>
					<ChevronRightTwoTone />
				</IconButton>
			</div>
			<label>
				{(props.view === 'month' && (
					<>
						<strong>{newLabel[0]}</strong>
						<span>{newLabel[1]}</span>
					</>
				)) ||
					(props.view === 'week' && (
						<>
							<strong>{newLabel[0]}</strong>
							<span>{newLabel[1]} - </span>
							<strong>{newLabel[3]}</strong>
							<span>{newLabel[4]}</span>
						</>
					)) ||
					(props.view === 'day' && (
						<>
							<strong>{newLabel[0]}</strong>
							<span>{newLabel[2]} - </span>
							<span>{newLabel[1]}</span>
						</>
					)) ||
					(props.view === 'agenda' && (
						<>
							<strong>{newLabel[0]}</strong>
							<span>{newLabel[1]}</span>
							<span>{newLabel[2]}</span>
						</>
					))}
			</label>
		</div>
	)
}

export default CustomToolbar
