// REACT
import React, { useContext, useState } from 'react'

// HOOKS
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL UI PICKERS
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import enLocale from 'date-fns/locale/en-US'
import esLocale from 'date-fns/locale/es'

// TOOLS
import { onChangePicker, onChangeInterval, disableDates, hideLicense } from './tools'
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

	const openRangePicker = () => hideLicense()

	return (
		<LocalizationProvider
			dateAdapter={AdapterDateFns}
			adapterLocale={langCode === 'es' ? esLocale : enLocale}>
			{!props.switch_1 ? (
				<DatePicker
					disablePast
					showToolbar={false}
					onChange={onChange}
					value={currentDate[0]}
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
						showToolbar={false}
						onOpen={openRangePicker}
						showDaysOutsideCurrentMonth
						className={Styles.datepicker}
						onChange={onChangeIntervalEv}
						onAccept={timePickerComponent}
						shouldDisableDate={disableDatesEv}
						value={currentDate as DateRange<Date>}
						renderInput={dateInput(false, $, props)}
					/>
				</>
			)}
		</LocalizationProvider>
	)
}

export default MUIDatePicker
