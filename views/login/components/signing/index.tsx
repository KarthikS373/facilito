// REACT
import React, { FormEvent, MutableRefObject, RefObject, MouseEvent, useRef } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import SocialLogin from '../socialLogin'
import { startSigning } from '../../utils/verification'
import Image from 'next/image'

// HOOKS
import { useStrings } from 'hooks/context'

// ICONOS
import Email from '@material-ui/icons/Email'
import Person from '@material-ui/icons/Person'
import Lock from '@material-ui/icons/Lock'

// MATERIAL
import LinearProgress from '@material-ui/core/LinearProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// ICONOS
const inputIcons: JSX.Element[] = [<Email />, <Lock />]

// INICIALES
const defLoginData: SigningData = {
	semail: '',
	spass: '',
	name: '',
}

// PROPIEDADES
interface FormProps {
	onLogin: EmptyFunction
}

const SigningForm: React.FC<FormProps> = (props: FormProps) => {
	// LENGUAJE
	const lang = useStrings()

	// REFERENCIAS
	const loginDataRef: MutableRefObject<SigningData> = useRef({ ...defLoginData })
	const progressRef: RefObject<HTMLDivElement> = useRef(null)

	// ENVIAR FORMULARIO
	const handleSubmit = (event: MouseEvent | FormEvent, _unlock?: EmptyFunction) => {
		// EVITAR RELOAD
		event.preventDefault()

		// CREAR USUARIO
		startSigning(event, loginDataRef, progressRef, true)
	}

	// GUARDAR DATOS
	const saveFormData = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target
		loginDataRef.current[name] = value
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
					<Image src='/assets/brand/logo.png' alt='Logo' height={70} width={128.85} />
					<h1>{lang.signing.create}</h1>
				</div>

				{/* FORMULARIO */}
				<form className={Styles.form} onSubmit={handleSubmit}>
					<TextField
						type='text'
						placeholder={lang.signing.nameInput}
						id='name'
						name='name'
						onChange={saveFormData}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Person />
								</InputAdornment>
							),
						}}
						autoComplete='username'
					/>

					{lang.login.formInputs.map((inputFields: any, key: number) => (
						<TextField
							key={key}
							type={inputFields.type}
							placeholder={inputFields.label}
							id={'s' + inputFields.field}
							name={'s' + inputFields.field}
							onChange={saveFormData}
							InputProps={{
								startAdornment: <InputAdornment position='start'>{inputIcons[key]}</InputAdornment>,
							}}
							autoComplete={inputFields.autocomplete}
						/>
					))}
					<Button type='submit' onClick={handleSubmit}>
						{lang.login.signing}
					</Button>
				</form>

				{/* SOCIAL */}
				<SocialLogin />

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<Button type='button' onClick={props.onLogin}>
						{lang.login.cta}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default SigningForm
