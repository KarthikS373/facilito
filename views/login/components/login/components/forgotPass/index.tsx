// REACT
import React from 'react'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ICONOS
import Mail from '@mui/icons-material/Mail'

// UTILS
import { forgotPass } from 'utils/auth'

// RESTABLECER PASSWORD
const resetPass = (): void => {
	// EMAIL
	let tempEmail = ''
	const getEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = ev.target
		tempEmail = value
	}

	// ALERTA
	window.Alert({
		title: 'Recuperar',
		body: 'Ingresa el correo electrónico al que deseas que enviemos un link de recuperación.',
		type: 'confirm',
		customElements: (
			<TextField
				style={{ margin: '20px 0 5px 0' }}
				onChange={getEmail}
				fullWidth
				id='lEmail'
				type='email'
				variant='outlined'
				label='Correo electrónico'
				placeholder='email@domain.com'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Mail color='primary' />
						</InputAdornment>
					),
				}}
			/>
		),
		onConfirm: () =>
			forgotPass(
				tempEmail,
				() => {
					window.Alert({
						title: '',
						body: 'Revisa tu correo electrónico para poder restablecer tu contraseña. (Recuerda revisar el SPAM).',
						type: 'alert',
					})
				},
				(err: string) =>
					window.Alert({
						title: 'Ocurrió un error',
						body: err,
						type: 'error',
					})
			),
	})
}

export default resetPass
