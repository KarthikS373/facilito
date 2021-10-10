// REACT
import React, { forwardRef } from 'react'

// MATERIAL
import TextField, { TextFieldProps } from '@mui/material/TextField'

const MuiPhoneInput: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
	props,
	ref
) => {
	return <TextField {...props} inputRef={ref} fullWidth />
}
export default forwardRef(MuiPhoneInput)
