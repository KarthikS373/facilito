// REACT
import React, { FormEvent, useState, RefObject, MouseEvent, useRef } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import SocialLogin from '../socialLogin'
import { startSigning } from '../../utils/verification'

// NEXT
import Image from 'next/image'

// HOOKS
import { withStrings, Portray } from 'components/portray'

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
const defSigningData: SigningData = {
	semail: '',
	spass: '',
	name: '',
}

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

// PROPIEDADES
interface FormProps {
	onLogin: EmptyFunction
}

const SigningForm: Portray.FC<FormProps> = ({ $, onLogin }) => {
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

	// CONFIGURAR STRINGS
	inputLists[0].label = $`Correo electrónico`
	inputLists[1].label = $`Contraseña`

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
					<h1>{$`Crea una cuenta`}</h1>
				</div>

				{/* FORMULARIO */}
				<form className={Styles.form} onSubmit={handleSubmit}>
					<TextField
						type='text'
						placeholder={$`Nombre de usuario`}
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

					{inputLists.map((inputFields: any, key: number) => (
						<TextField
							key={`signing_input_${key}`}
							type={inputFields.type}
							placeholder={inputFields.label}
							id={'s' + inputFields.field}
							name={'s' + inputFields.field}
							value={
								key === 0 ? signingData.name : key === 1 ? signingData.semail : signingData.spass
							}
							onChange={saveFormData}
							InputProps={{
								startAdornment: <InputAdornment position='start'>{inputIcons[key]}</InputAdornment>,
							}}
							autoComplete={inputFields.autocomplete}
						/>
					))}
					<Button type='submit' onClick={handleSubmit}>
						{$`Registrarme`}
					</Button>
				</form>

				{/* SOCIAL */}
				<SocialLogin />

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<Button type='button' onClick={onLogin}>
						{$`Iniciar sesión`}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default withStrings(SigningForm)
