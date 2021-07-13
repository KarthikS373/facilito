// REACT
import React, { ChangeEvent, FormEvent, MouseEvent, useState, useRef, RefObject } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import SocialLogin from '../socialLogin'
import { startSigning } from '../../utils/verification'

// NEXT
import Image from 'next/image'

// HOOKS
import { useStrings } from 'hooks/context'

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

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
	// LENGUAJE
	const lang = useStrings()

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
		startSigning(event, loginData, progressRef)
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
					<h1>{lang.login.welcome}</h1>
				</div>

				{/* FORMULARIO */}
				<form className={Styles.form} onSubmit={handleSubmit}>
					{lang.login.formInputs.map((inputFields: any, key: number) => (
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
						label={lang.login.remember}
					/>
					<Button type='submit' onClick={handleSubmit}>
						{lang.login.cta}
					</Button>
				</form>

				{/* SOCIAL */}
				<SocialLogin />

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<Button type='button'>{lang.login.forgot}</Button>
					<Button type='button' onClick={props.onSigning}>
						{lang.login.signing}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
