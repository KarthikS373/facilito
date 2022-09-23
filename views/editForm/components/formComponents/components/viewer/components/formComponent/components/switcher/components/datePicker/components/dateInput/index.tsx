/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React, { useState } from 'react'

// PICKERS
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import TextField from '@mui/material/TextField'

// INTERFACE
import getPickerProps, { PickerProps, sendDate } from './tools'
import useStrings from 'hooks/lang'

const initialDate = new Date()
const TimeInput: React.FC<PickerProps> = (props) => {
	// ESTADO
	const [selectedDate, handleDateChange] = useState<(Date | null)[]>(props.def || [initialDate])

	// STRINGS
	const { $ } = useStrings()

	// ENVIAR TIEMPO
	const sendDateEv = (index: number) => (date: Date | null) =>
		sendDate(index, date, selectedDate, handleDateChange, props.onDates)

	// ELIMINAR PROPS DE COMPONENTE
	const customProps: PickerProps = getPickerProps(props)

	return (
		<>
			<TimePicker
				{...customProps}
				ampm
				mask='__:__ _M'
				showToolbar={false}
				value={selectedDate[0]}
				label={$`Desde (hh:mm)`}
				onChange={sendDateEv(0) as (date: unknown | null) => void}
				renderInput={(props) => <TextField fullWidth {...props} helperText={undefined} />}
			/>
			{props.range && (
				<TimePicker
					{...customProps}
					ampm
					mask='__:__ _M'
					showToolbar={false}
					value={selectedDate[1]}
					label={$`Hasta (hh:mm)`}
					onChange={sendDateEv(1) as (date: unknown | null) => void}
					renderInput={(props) => (
						<TextField fullWidth {...props} style={{ marginTop: '15px' }} helperText={undefined} />
					)}
				/>
			)}
		</>
	)
}

export default TimeInput
