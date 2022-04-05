// REACT
import React, { FormEvent, useState, RefObject, MouseEvent, useRef } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import { startSigning } from '../../utils/verification'
import PasswordTextField from '../passwordInput'
import ColorButton from 'components/button'
import SocialLogin from '../socialLogin'

// NEXT
import Image from 'next/image'

// HOC
import useStrings from 'hooks/lang'

// ICONOS
import ExitToApp from '@mui/icons-material/ExitToApp'
import Person from '@mui/icons-material/Person'
import Email from '@mui/icons-material/Email'
import Lock from '@mui/icons-material/Lock'

// MATERIAL
import LinearProgress from '@mui/material/LinearProgress'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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

const SigningForm: React.FC<FormProps> = ({ onLogin }) => {
	// STRINGS
	const { $ } = useStrings()

	// DATOS DE REGISTRO
	const [signingData, setSigningData] = useState<SigningData>({ ...defSigningData })

	// BARRA DE PROGRESO
	const progressRef: RefObject<HTMLDivElement> = useRef(null)

	// ENVIAR TIENDA
	const handleSubmit = (event: MouseEvent | FormEvent) => {
		event.preventDefault()
		startSigning(event, signingData, progressRef, true)
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
					<Image unoptimized src='/assets/brand/logo.png' alt='Logo' height={70} width={128.85} />
				</div>

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

					<ColorButton
						type='submit'
						variant='contained'
						onClick={handleSubmit}
						startIcon={<ExitToApp />}
						$style={{
							color: '#fff',
							background: 'linear-gradient(to right, var(--primary),  var(--primaryDark))',
						}}>
						{$`Registrarme`}
					</ColorButton>
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
}

export default SigningForm
