/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React, { useState } from 'react'

// PICKERS
import TextField from '@mui/material/TextField'
import TimePicker from '@mui/lab/TimePicker'

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
			{/* 
    // @ts-ignore */}
			<TimePicker
				{...customProps}
				ampm
				mask='__:__ _M'
				showToolbar={false}
				onChange={sendDateEv(0)}
				value={selectedDate[0]}
				label={$`Desde (hh:mm)`}
				renderInput={(props) => <TextField fullWidth {...props} helperText={undefined} />}
			/>
			{props.range && (
				// @ts-ignore
				<TimePicker
					{...customProps}
					ampm
					mask='__:__ _M'
					showToolbar={false}
					onChange={sendDateEv(1)}
					value={selectedDate[1]}
					label={$`Hasta (hh:mm)`}
					renderInput={(props) => (
						<TextField fullWidth {...props} style={{ marginTop: '15px' }} helperText={undefined} />
					)}
				/>
			)}
		</>
	)
}

export default TimeInput
