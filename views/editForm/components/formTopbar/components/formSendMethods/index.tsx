// REACT
import React, { useRef, MutableRefObject, ChangeEvent, useState } from 'react'

// MATERIAL
import TextField from '@mui/material/TextField'

// HOOKS
import useStrings from 'hooks/lang'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

// ICONOS
import WhatsApp from '@mui/icons-material/WhatsApp'
import Email from '@mui/icons-material/Email'

// UTILS
import { saveFormSendMethods } from 'utils/forms'
import { verifyEmail } from 'utils/auth'

// PROPIEDADES
interface FormSendMethodsProps {
	callback: (answersConnection?: ConnectionMethods) => unknown
	upDateMethods: (methods: ConnectionMethods) => unknown
	companyID: string
	id: string
}

const defConnection: ConnectionMethods = {
	methods: [],
	whatsapp: 0,
	email: '',
}

const FormSendMethods: React.FC<FormSendMethodsProps> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	// ERROR STATE
	const [err, setErr] = useState<[boolean, boolean]>([false, false])

	// DATOS
	const methodsRef: MutableRefObject<ConnectionMethods> = useRef({ ...defConnection })

	// GUARDAR EN REFERENCIA
	const saveOnMethods = (key: keyof ConnectionMethods) => (ev: ChangeEvent<HTMLInputElement>) =>
		(methodsRef.current[key] = key === 'whatsapp' ? parseInt(ev.target.value) : ev.target.value)

	// ENVIAR Y VALIDAR
	const validateFields = () => {
		const errVals: [boolean, boolean] = [false, false]
		const sendMethods: ('whatsapp' | 'email')[] = []

		// VALIDAR
		if (methodsRef.current.whatsapp.toString().length) {
			if (methodsRef.current.whatsapp.toString().length < 8) errVals[0] = true
			else sendMethods.push('whatsapp')
		}

		// VERIFICAR CORREOS
		if (methodsRef.current.email)
			if (!verifyEmail(methodsRef.current.email)) errVals[1] = true
			else sendMethods.push('email')

		// ACTUALIZAR ESTADO
		if (!errVals[0] && !errVals[1]) {
			// ASIGNAR MÉTODOS
			if (sendMethods.length) {
				methodsRef.current.methods = sendMethods
				saveFormSendMethods(props.companyID, props.id, methodsRef.current).then(() => {
					props.upDateMethods(methodsRef.current)
					props.callback(methodsRef.current)
				})
			}
		}
		setErr(errVals)
	}

	// CERRAR
	const close = () => props.callback()

	return (
		<div>
			<TextField
				variant='outlined'
				label={$`Número de WhatsApp`}
				fullWidth
				helperText={err[0] && $`Número de teléfono no valido`}
				placeholder='+50212345678'
				type='number'
				color='primary'
				error={err[0]}
				onChange={saveOnMethods('whatsapp')}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<WhatsApp />
						</InputAdornment>
					),
				}}
			/>
			<TextField
				variant='outlined'
				label={$`Correo electrónico`}
				helperText={err[1] && $`Correo electrónico no valido`}
				fullWidth
				type='email'
				placeholder='name@example.com'
				onChange={saveOnMethods('email')}
				color='primary'
				error={err[1]}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Email />
						</InputAdornment>
					),
				}}
			/>
			<div>
				<Button onClick={close}>{$`Cancelar`}</Button>
				<Button onClick={validateFields}>{$`Conectar`}</Button>
			</div>
		</div>
	)
}

export default FormSendMethods
