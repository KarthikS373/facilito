// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import StylesGlb from '../../../../style.module.scss'
import Styles from './style.module.scss'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import Switch from '@mui/material/Switch'
import Input from '@mui/material/Input'

// COMPONENTES
import TimeInput from './components/dateInput'

// TOOLS
import FormContext from '../../../../../../context'
import useStrings from 'hooks/lang'
import getDaysStr, {
	handleDuration,
	setSelectedDay,
	getDefValues,
	getDefDates,
	setAllDays,
	sendTime,
} from './tools'

// MATERIAL UI PICKERS
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import esLocale from 'date-fns/locale/es'

const DatePicker: React.FC = () => {
	// FORM PROPS
	const props = useContext(FormContext)

	// ESTADOS
	const [days, setDays] = useState<boolean[]>(getDefValues(props.daysOfWeek))

	// DURACIONES
	const [duration, setDuration] = useState<number>(props.duration || 0)

	// INTERVALOS
	const [intervals, setIntervals] = useState<number>(1)

	// STRINGS
	const { $ } = useStrings()

	// LLENAR TODOS LOS DIAS
	const setAllDaysEv = (ev: React.ChangeEvent<HTMLInputElement>) =>
		setAllDays(ev, setDays, props.onChange)

	// ENVIAR DURACIÓN
	const handleDurationEv = (ev: SelectChangeEvent) =>
		handleDuration(ev, setDuration, props.onChange)

	// SELECCIONAR DIA
	const setSelectedDayEv = (index: number) => (ev: React.ChangeEvent<HTMLInputElement>) =>
		setSelectedDay(index, ev, setDays, props.onChange)

	// HABILITAR INTERVALOS
	const handleInterval = (_ev: React.ChangeEvent, checked: boolean) =>
		props.onChange && props.onChange('switch_1', checked)

	// ENVIAR TIEMPOS
	const sendTimeEv = (index: keyof BlockComponent) => (date: (Date | null)[]) =>
		sendTime(index, date, setIntervals, props.onChange)

	// ENVIAR DURACIÓN
	const sendComponentField =
		(field: keyof BlockComponent) => (ev: React.ChangeEvent<HTMLInputElement>) =>
			props.onChange && props.onChange(field, ev.target.valueAsNumber)

	// ESTADO INICIAL
	const defDates: (Date | null)[] | undefined = getDefDates(props.time)

	// TEXTOS DE DIAS
	const daysStr = getDaysStr($)

	return (
		<>
			<Input
				required
				placeholder={$`Describe el titulo de esta sección.`}
				defaultValue={props.label}
				className={`${StylesGlb.label} ${props.preview && StylesGlb.labelPreview} ${
					props.preview && StylesGlb.titlePreview
				}`}
				id={`${props.name}_${props.id}`}
				onChange={props.onWrite && props.onWrite('label')}
				inputProps={{ 'aria-label': 'Answer' }}
			/>
			<input
				required
				aria-label='Helper'
				className={`${StylesGlb.label} ${StylesGlb.helper}`}
				placeholder={
					props.isAnchor
						? $`Escribe tu enlace aquí (ej: https://example.com)`
						: $`Agrega una descripción`
				}
				defaultValue={props.helper}
				style={props.isAnchor ? { color: 'var(--blue)' } : undefined}
				id={`${props.name}_helper_${props.id}`}
				onChange={props.onWrite && props.onWrite(props.isAnchor ? 'href' : 'helper')}
			/>
			{props.active && (
				<>
					<div className={Styles.daysRange}>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>{$`Selecciona los dias de la semana disponibles:`}</FormLabel>
							<FormGroup className={Styles.gridChecks}>
								{daysStr.map((day: string, key: number) => (
									<FormControlLabel
										key={`days_${key}`}
										control={
											<Checkbox
												checked={days[key]}
												onChange={key === 0 ? setAllDaysEv : setSelectedDayEv(key)}
												name={day}
												color='primary'
											/>
										}
										label={day}
									/>
								))}
							</FormGroup>
							<FormControlLabel
								value='intervals'
								control={
									<Switch
										defaultChecked={props.switch_1}
										onChange={handleInterval}
										color='primary'
									/>
								}
								label={$`Habilitar intervalos`}
							/>
						</FormControl>
						<div className={Styles.gridInputs}>
							<h3>{$`Selecciona las horas disponibles:`}</h3>
							<LocalizationProvider dateAdapter={DateFnsAdapter} locale={esLocale}>
								<TimeInput
									minutesStep={0}
									fullWidth
									onDates={sendTimeEv('time')}
									def={defDates}
									className={Styles.dateField}
									InputLabelProps={{
										shrink: true,
									}}
									range
								/>
								<FormControl fullWidth style={{ marginTop: '15px' }}>
									<InputLabel id='label-duration-select'>{$`Duración (horas)`}</InputLabel>
									<Select
										fullWidth
										labelId='duration-select'
										id='duration-select'
										label={$`Duración (horas)`}
										onChange={handleDurationEv}
										defaultValue={props.duration?.toString() || ''}
										value={duration === 0 ? '' : duration?.toString()}>
										{Array(Math.max(0, Number.isNaN(intervals) ? 0 : +intervals))
											.fill({})
											.map((_s, index: number) => (
												<MenuItem key={`duration_${index}`} value={60 * (index + 1)}>
													{index + 1}
												</MenuItem>
											))}
									</Select>
								</FormControl>
							</LocalizationProvider>
						</div>
					</div>
					<div className={Styles.dateRow}>
						<h3>{$`Selecciona una cantidad de ocupaciones:`}</h3>
						<TextField
							id={`${props.name}_reservations_${props.id}`}
							label={$`Ocupaciones`}
							type='number'
							fullWidth
							placeholder='0'
							defaultValue={props.reservations}
							onChange={sendComponentField('reservations')}
							style={{ marginTop: '5px' }}
							className={Styles.dateField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
				</>
			)}
		</>
	)
}

export default DatePicker
