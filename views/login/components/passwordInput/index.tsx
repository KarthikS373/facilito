// REACT
import React, { useState } from 'react'

// MATERIAL
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// ICONS
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

const PasswordTextField: React.FC<TextFieldProps> = (props) => {
	// TOGGLE
	const [showPass, setShowPass] = useState<boolean>(false)

	// CAMBIAR INPUT DE PASSWORD
	const handleClickShowPassword = () => setShowPass(!showPass)

	return (
		<TextField
			{...props}
			type={showPass ? 'text' : 'password'}
			InputProps={{
				...props.InputProps,
				endAdornment: (
					<InputAdornment position='end'>
						<IconButton
							size='small'
							aria-label='toggle password visibility'
							onClick={handleClickShowPassword}>
							{showPass ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	)
}

export default PasswordTextField
