// REACT
import React, { ChangeEvent, FormEvent, MouseEvent, useState, useRef, RefObject } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import { startSigning } from '../../utils/verification'
import PasswordTextField from '../passwordInput'
import resetPass from './components/forgotPass'
import SocialLogin from '../socialLogin'

// INITIALS
import { defLoginData } from './utils/initials'

// NEXT
import Image from 'next/image'

// HOC
import withStrings from 'hoc/lang'

// ICONOS
import ExitToApp from '@material-ui/icons/ExitToApp'
import Email from '@material-ui/icons/Email'
import Lock from '@material-ui/icons/Lock'

// MATERIAL
import FormControlLabel from '@material-ui/core/FormControlLabel'
import LinearProgress from '@material-ui/core/LinearProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

// PROPIEDADES
interface LoginFormProps {
	onSigning: EmptyFunction
}

const LoginForm: React.FC<LoginFormProps> = withStrings<LoginFormProps>(({ $, onSigning }) => {
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
					<Image src='/assets/brand/logo.png' alt='Logo' height={70} width={128.85} />
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

					<Button
						type='submit'
						variant='contained'
						startIcon={<ExitToApp />}
						classes={{ root: Styles.loginBtn }}
						onClick={handleSubmit}>
						{$`Iniciar sesión`}
					</Button>
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
})

export default LoginForm
