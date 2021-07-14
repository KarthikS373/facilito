// REACT
import React, { useState } from 'react'

// MATERIAL
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

// ICONS
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'

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
						<IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword}>
							{showPass ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	)
}

export default PasswordTextField
