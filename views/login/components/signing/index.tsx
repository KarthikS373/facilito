// REACT
import React, { FormEvent, useState, RefObject, MouseEvent, useRef } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import { startSigning } from '../../utils/verification'
import PasswordTextField from '../passwordInput'
import SocialLogin from '../socialLogin'

// NEXT
import Image from 'next/image'

// ASSETS
import Logo from '../../../../public/assets/brand/logo.png'

// HOC
import withStrings from 'hoc/lang'

// ICONOS
import ExitToApp from '@material-ui/icons/ExitToApp'
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Email'
import Lock from '@material-ui/icons/Lock'

// MATERIAL
import LinearProgress from '@material-ui/core/LinearProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// INICIALES
const defSigningData: SigningData = {
	semail: '',
	spass: '',
	name: '',
}

// PROPIEDADES
interface FormProps {
	onLogin: EmptyFunction
}

const SigningForm: React.FC<FormProps> = withStrings<FormProps>(({ $, onLogin }) => {
	// DATOS DE REGISTRO
	const [signingData, setSigningData] = useState<SigningData>({ ...defSigningData })

	// BARRA DE PROGRESO
	const progressRef: RefObject<HTMLDivElement> = useRef(null)

	// ENVIAR FORMULARIO
	const handleSubmit = (event: MouseEvent | FormEvent, _unlock?: EmptyFunction) => {
		event.preventDefault()
		startSigning(event, signingData, progressRef, true, true)
	}

	// GUARDAR DATOS
	const saveFormData = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target
		setSigningData((prevData: SigningData) => ({ ...prevData, [name]: value }))
	}

	return (
		<div className={Styles.container}>
			{/* BLOQUEAR PANTALLA CON PROGRESSBAR */}
			<div className={Styles.lockScreen} ref={progressRef}>
				<LinearProgress className={Styles.progress} />
			</div>

			<div className={Styles.content}>
				{/* TITULO */}
				<div className={Styles.title}>
					<Image placeholder='blur' src={Logo} alt='Logo' />
				</div>

				{/* FORMULARIO */}
				<form className={Styles.form} onSubmit={handleSubmit}>
					{/* NOMBRE */}
					<TextField
						id='name'
						name='name'
						type='text'
						variant='outlined'
						autoComplete='username'
						onChange={saveFormData}
						value={signingData.name}
						placeholder={$`John Doe`}
						label={$`Nombre de usuario`}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Person color='primary' />
								</InputAdornment>
							),
						}}
					/>

					{/* CORREO */}
					<TextField
						id='semail'
						name='semail'
						type='email'
						variant='outlined'
						autoComplete='email'
						onChange={saveFormData}
						value={signingData.semail}
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
						name='spass'
						id='spass'
						type='password'
						variant='outlined'
						label={$`Contraseña`}
						onChange={saveFormData}
						value={signingData.spass}
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

					<Button
						type='submit'
						variant='contained'
						startIcon={<ExitToApp />}
						classes={{ root: Styles.loginBtn }}
						onClick={handleSubmit}>
						{$`Registrarme`}
					</Button>
				</form>

				{/* SOCIAL */}
				<SocialLogin />

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<Button fullWidth color='primary' type='button' onClick={onLogin}>
						{$`Iniciar sesión`}
					</Button>
				</div>
			</div>
		</div>
	)
})

export default SigningForm
