// REACT
import React, { useContext, useState } from 'react'

// HOOKS
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL UI PICKERS
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker'
import { RangeInput } from '@mui/lab/DateRangePicker/RangeTypes'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import enLocale from 'date-fns/locale/en-US'
import esLocale from 'date-fns/locale/es'

// TOOLS
import { onChangePicker, onChangeInterval, disableDates } from './tools'
import { useComponentRegister } from '../../hooks'

// COMPONENTES
import timePicker from './components/timePicker'
import dateInput from './components/input'
import FormContext from '../../context'

const MUIDatePicker: React.FC = () => {
	// STRINGS
	const { $, langCode } = useStrings()

	// PROPS
	const props = useContext(FormContext)

	// ESTADO
	const [currentDate, setCurrentDate] = useState<(Date | null)[]>([null, null])

	// REGISTRAR
	useComponentRegister(props.register, props.name, props.id, { required: props.required })

	// ENVIAR FECHA
	const onChange = (date: Date | null) => onChangePicker(date, props.reservations, setCurrentDate)

	// ENVIAR FECHAS
	const onChangeIntervalEv = (dates: DateRange<Date | null>) =>
		onChangeInterval(dates, props.reservations, setCurrentDate)

	// DESACTIVAR DIAS
	const disableDatesEv = (day: Date | null) => disableDates(day, props.daysOfWeek)

	// SELECCIONAR TIEMPO
	const timePickerComponent = (date: DateRange<Date> | Date | null) =>
		timePicker(props, date, $`Seleccionar horarios`)

	return (
		<LocalizationProvider
			dateAdapter={DateFnsAdapter}
			locale={langCode === 'es' ? esLocale : enLocale}>
			{!props.switch_1 ? (
				<DatePicker
					disablePast
					showTodayButton
					todayText={$`Hoy`}
					showToolbar={false}
					onChange={onChange}
					okText={$`Aceptar`}
					cancelText={$`Cancelar`}
					value={currentDate[0]}
					allowSameDateSelection
					showDaysOutsideCurrentMonth
					className={Styles.datepicker}
					onAccept={timePickerComponent}
					shouldDisableDate={disableDatesEv}
					renderInput={dateInput(true, $, props)}
					label={props.label + (props.required ? '*' : '')}
				/>
			) : (
				<>
					<label className={Styles.label}>{props.label + (props.required ? '*' : '')}</label>
					<DateRangePicker
						disablePast
						showTodayButton
						todayText={$`Hoy`}
						showToolbar={false}
						okText={$`Aceptar`}
						allowSameDateSelection
						cancelText={$`Cancelar`}
						showDaysOutsideCurrentMonth
						className={Styles.datepicker}
						onChange={onChangeIntervalEv}
						onAccept={timePickerComponent}
						shouldDisableDate={disableDatesEv}
						value={currentDate as RangeInput<Date>}
						renderInput={dateInput(false, $, props)}
					/>
				</>
			)}
		</LocalizationProvider>
	)
}

export default MUIDatePicker
