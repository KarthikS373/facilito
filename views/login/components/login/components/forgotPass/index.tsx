// REACT
import React from 'react'

// MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

// ICONOS
import Mail from '@material-ui/icons/Mail'

// UTILS
import { forgotPass } from 'utils/auth'

// RESTABLECER PASSWORD
const resetPass = () => {
	// EMAIL
	let tempEmail: string = ''
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
				style={{ margin: '10px 0' }}
				onChange={getEmail}
				placeholder='Correo electrónico'
				fullWidth
				id='lEmail'
				variant='outlined'
				type='email'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Mail />
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
