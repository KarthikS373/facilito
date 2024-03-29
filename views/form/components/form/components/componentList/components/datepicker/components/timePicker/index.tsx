// REACT
import React from 'react'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// CONTEXTO
import { FormContextProps } from '../../../../context'

// TOOLS
import { parseDate } from 'utils/tools'

const timePicker = (
	{ duration, time, setValue, id, name }: FormContextProps,
	currentDate: DateRange<Date> | Date | null,
	inputLabel: string
): void => {
	// CALCULAR INTERVALOS
	const timeDuration = (duration || 0) / 60
	const times = time
		? Math.round(
				((parseDate(time[1])?.getHours() || 0) - (parseDate(time[0])?.getHours() || 0)) /
					timeDuration
		  )
		: 0
	const timeIntervals = Array(times)
		.fill({})
		.map((_e, cIndex: number) => {
			if (time) {
				const hour = parseDate(time[0])?.getHours() || 0
				const index = cIndex + 1
				const startTime = hour + timeDuration * cIndex
				return [startTime, `${startTime}hrs - ${hour + timeDuration * index}hrs`]
			} else return [0, '']
		})

	// TIEMPO POR DEFECTO
	let currentTime = (timeIntervals[0] ? timeIntervals[0][0] : 0) as number
	const handleHours = (ev: SelectChangeEvent) =>
		(currentTime = parseInt(ev.target.value.toString()))

	// ALERTA DE HORARIOS
	window.Alert({
		title: window.innerWidth < 450 ? 'Horarios' : 'Seleccionar horarios',
		body: 'Aquí tienes una lista de horas disponibles, selecciona una y luego haz click en "Aceptar"',
		type: 'confirm',
		zIndex: 1301,
		cancelBtn: <></>,
		onConfirm: () => {
			if (currentDate) {
				if ('setHours' in currentDate) {
					currentDate.setHours(currentTime)
					currentDate.setMinutes(0)
				} else {
					currentDate.forEach((date: Date | null) => {
						// CONFIGURAR HORAS
						if (date) {
							date.setHours(currentTime)
							date.setMinutes(0)
						}
					})
				}
			}

			// ENVIAR Y REINICIAR
			setValue &&
				setValue(
					`${name}_${id}`,
					currentDate ? ('setHours' in currentDate ? [currentDate] : currentDate) : null
				)
		},
		onHide: () => window.hideAlert(),
		customElements: (
			<FormControl fullWidth style={{ margin: '18px 0 10px 0' }}>
				<InputLabel id='time_selector'>{inputLabel}</InputLabel>
				<Select
					autoFocus
					defaultValue=''
					id='picker-hours'
					label={inputLabel}
					variant='outlined'
					onChange={handleHours}
					labelId='picker-hours-bale'>
					{timeIntervals.map((interval: (number | string)[], index: number) => (
						<MenuItem value={interval[0]} key={`hour_${index}`}>
							{interval[1]}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		),
	})
}

export default timePicker
