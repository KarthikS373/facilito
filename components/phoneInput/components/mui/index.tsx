// REACT
import React, { forwardRef } from 'react'

// MATERIAL
import TextField, { TextFieldProps } from '@mui/material/TextField'

const MuiPhoneInput: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
	props,
	ref
) => {
	return (
		<TextField
			{...props}
			InputProps={{
				startAdornment: <></>,
			}}
			inputRef={ref}
			fullWidth
			type='tel'
		/>
	)
}
export default forwardRef(MuiPhoneInput)
