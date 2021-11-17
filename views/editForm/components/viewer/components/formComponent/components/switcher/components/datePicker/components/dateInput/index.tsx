/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React, { useState } from 'react'

// PICKERS
import TextField from '@mui/material/TextField'
import TimePicker from '@mui/lab/TimePicker'

// INTERFACE
import getPickerProps, { PickerProps } from './tools'
import useStrings from 'hooks/lang'

const initialDate = new Date()
const TimeInput: React.FC<PickerProps> = (props) => {
	// ESTADO
	const [selectedDate, handleDateChange] = useState<(Date | null)[]>(props.def || [initialDate])

	// STRINGS
	const { $ } = useStrings()

	// ENVIAR TIEMPO
	const sendDate = (index: number) => (date: Date | null) => {
		// COPIAR
		const dates = [...selectedDate] as (Date | null)[]

		// ASIGNAR
		dates[index] = date
		if (
			index === 1 &&
			dates[1]?.getTime() &&
			dates[0]?.getTime() &&
			dates[1]?.getTime() - dates[0]?.getTime() < 0
		)
			dates[0] = dates[1]
		else if (
			index === 0 &&
			dates[1]?.getTime() &&
			dates[0]?.getTime() &&
			dates[1]?.getTime() - dates[0]?.getTime() < 0
		)
			dates[1] = dates[0]

		// ACTUALIZAR
		props.onDates && props.onDates(dates)
		handleDateChange(dates)
	}

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
				onChange={sendDate(0)}
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
					onChange={sendDate(1)}
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
