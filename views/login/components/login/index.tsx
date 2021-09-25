// REACT
import React, { ChangeEvent, FormEvent, MouseEvent, useState, useRef, RefObject } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import { startSigning } from '../../utils/verification'
import PasswordTextField from '../passwordInput'
import resetPass from './components/forgotPass'
import ColorButton from 'components/button'
import SocialLogin from '../socialLogin'

// INITIALS
import { defLoginData } from './utils/initials'

// NEXT
import Image from 'next/image'

// HOC
import useStrings from 'hooks/lang'

// ICONOS
import ExitToApp from '@mui/icons-material/ExitToApp'
import Email from '@mui/icons-material/Email'
import Lock from '@mui/icons-material/Lock'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import LinearProgress from '@mui/material/LinearProgress'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

// PROPIEDADES
interface LoginFormProps {
	onSigning: EmptyFunction
}

const LoginForm: React.FC<LoginFormProps> = ({ onSigning }) => {
	// STRINGS
	const { $ } = useStrings()

	// RECORDAR USUARIO
	const [remember, setRemember] = useState<boolean>(true)

	// DATOS DEL FORMULARIO
	const [loginData, setLoginData] = useState<LoginData>({ ...defLoginData })

	// BARRA DE PROGRESO
	const progressRef: RefObject<HTMLDivElement> = useRef(null)

	// ASIGNAR RECORDAR
	const handleRememberChange = (event: ChangeEvent) => {
		const inp = event.target as HTMLInputElement
		setRemember(inp.checked)
	}

	// ENVIAR FORMULARIO
	const handleSubmit = (event: FormEvent | MouseEvent) => {
		// INICIAR SESIÓN
		event.preventDefault()
		startSigning(event, loginData, progressRef, false, remember)
	}

	// GUARDAR DATOS
	const saveFormData = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target
		setLoginData((prevLogin: LoginData) => ({ ...prevLogin, [name]: value }))
	}

	return (
		<div className={Styles.container}>
			{/* BLOQUEAR PANTALLA CON PROGRESS BAR */}
			<div className={Styles.lockScreen} ref={progressRef}>
				<LinearProgress className={Styles.progress} />
			</div>

			<div className={Styles.content}>
				{/* TITULO */}
				<div className={Styles.title}>
					<Image unoptimized src='/assets/brand/logo.png' alt='Logo' height={70} width={128.85} />
				</div>

				{/* FORMULARIO */}
				<form className={Styles.form} onSubmit={handleSubmit}>
					{/* EMAIL */}
					<TextField
						id='email'
						name='email'
						type='email'
						variant='outlined'
						autoComplete='email'
						value={loginData.email}
						onChange={saveFormData}
						label={$`Correo electrónico`}
						placeholder={$`example@domain.com`}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Email color='primary' />
								</InputAdornment>
							),
						}}
					/>

					{/* PASSWORD */}
					<PasswordTextField
						name='pass'
						id='pass'
						type='password'
						variant='outlined'
						label={$`Contraseña`}
						value={loginData.pass}
						onChange={saveFormData}
						autoComplete='new-password'
						placeholder={$`securepass124`}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Lock color='primary' />
								</InputAdornment>
							),
						}}
					/>

					{/* REMEMBER */}
					<FormControlLabel
						control={
							<Checkbox
								color='primary'
								checked={remember}
								size='small'
								onChange={handleRememberChange}
								name='remember'
							/>
						}
						label={$`Recuérdame en este dispositivo`}
					/>

					<ColorButton
						type='submit'
						variant='contained'
						onClick={handleSubmit}
						startIcon={<ExitToApp />}
						$style={{
							color: '#fff',
							background: 'linear-gradient(to right, #1aa5bb, #166cd6)',
						}}>
						{$`Iniciar sesión`}
					</ColorButton>
				</form>

				{/* SOCIAL */}
				<SocialLogin />

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<Button fullWidth type='button' onClick={resetPass}>
						{$`¿Olvidaste tu contraseña?`}
					</Button>
					<Button fullWidth color='primary' type='button' onClick={onSigning}>
						{$`Registrarme`}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
