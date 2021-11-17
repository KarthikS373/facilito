// REACT
import React, { forwardRef } from 'react'

// MATERIAL
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

const MuiPhoneInput: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
	props,
	ref
) => {
	return (
		<TextField
			{...props}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<div style={{ width: 38 }} />
					</InputAdornment>
				),
			}}
			inputRef={ref}
			fullWidth
			type='tel'
		/>
	)
}
export default forwardRef(MuiPhoneInput)
