// REACT
import React, { ChangeEvent, FormEvent, MouseEvent, useState, useRef, RefObject } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import { startSigning } from '../../utils/verification'
import resetPass from './components/forgotPass'
import SocialLogin from '../socialLogin'

// NEXT
import Image from 'next/image'

// HOC
import withStrings from 'hoc/lang'

// ICONOS
import Email from '@material-ui/icons/Email'
import Lock from '@material-ui/icons/Lock'

// MATERIAL
import FormControlLabel from '@material-ui/core/FormControlLabel'
import LinearProgress from '@material-ui/core/LinearProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

// ICONOS
const inputIcons: JSX.Element[] = [<Email />, <Lock />]

// INICIALES
const defLoginData: LoginData = {
	email: '',
	pass: '',
}

// PROPIEDADES
interface LoginFormProps {
	onSigning: EmptyFunction
}

// LISTA DE INPUTS
const inputLists = [
	{
		label: 'Correo electrónico',
		name: 'email',
		type: 'email',
		field: 'email',
		autocomplete: 'email',
	},
	{
		label: 'Contraseña',
		name: 'password',
		type: 'password',
		field: 'pass',
		autocomplete: 'new-password',
	},
]

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

	// CONFIGURAR STRINGS
	inputLists[0].label = $`Correo electrónico`
	inputLists[1].label = $`Contraseña`

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
					<h1>{$`¡Bienvenido!`}</h1>
				</div>

				{/* FORMULARIO */}
				<form className={Styles.form} onSubmit={handleSubmit}>
					{inputLists.map((inputFields, key: number) => (
						<TextField
							key={`login_input_${key}`}
							type={inputFields.type}
							placeholder={inputFields.label}
							id={inputFields.field}
							name={inputFields.field}
							onChange={saveFormData}
							value={key === 0 ? loginData.email : loginData.pass}
							InputProps={{
								startAdornment: <InputAdornment position='start'>{inputIcons[key]}</InputAdornment>,
							}}
							autoComplete={inputFields.autocomplete}
						/>
					))}
					<FormControlLabel
						control={
							<Checkbox
								color='primary'
								checked={remember}
								onChange={handleRememberChange}
								name='remember'
							/>
						}
						label={$`Recuérdame`}
					/>
					<Button type='submit' onClick={handleSubmit}>
						{$`Iniciar sesión`}
					</Button>
				</form>

				{/* SOCIAL */}
				<SocialLogin />

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<Button type='button' onClick={resetPass}>
						{$`¿Olvidaste tu contraseña?`}
					</Button>
					<Button type='button' onClick={onSigning}>
						{$`Registrarme`}
					</Button>
				</div>
			</div>
		</div>
	)
})

export default LoginForm
