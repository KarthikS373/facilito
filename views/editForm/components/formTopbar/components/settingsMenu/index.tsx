// REACT
import React, { ChangeEvent, useEffect, useState } from 'react'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import Fade from '@mui/material/Fade'

import PhoneField from 'components/phoneInput'

// ICONOS
import WhatsApp from '@mui/icons-material/WhatsApp'
import Create from '@mui/icons-material/Create'
import Email from '@mui/icons-material/Email'
import Cloud from '@mui/icons-material/Cloud'
import Link from '@mui/icons-material/Link'
import useStrings from 'hooks/lang'
import { verifyEmail } from 'utils/auth'
import { deleteURL, validateURL } from 'utils/urls'

// PROPIEDADES
interface SettingsMenuProps {
	updateConnectionMethods: (answersConnection?: ConnectionMethods) => unknown
	onAnswersConnection: (answersConnection?: ConnectionMethods) => unknown
	connectionMethods?: ConnectionMethods
	publishOptions: null | HTMLElement
	onChangeURL: (url: string) => Promise<void>
	onSave: (ctrl: boolean) => unknown
	onClose: EmptyFunction
	open: boolean
	url: string
}

// ICONOS
const optionIcons = [<WhatsApp key='w_1' />, <Email key='e_1' />, <Cloud key='c_1' />]

const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	// ESTADO
	const [whatsappNumber, setWhatsappNumber] = useState<string | undefined>(
		props.connectionMethods?.whatsapp.toString()
	)
	const [email, setEmail] = useState<string | undefined>(props.connectionMethods?.email)

	// ERRORES [whatsapp, email, link]
	const [errs, setErrs] = useState<[boolean, boolean, boolean]>([false, false, false])

	// REFERENCIAS
	const [formURL, setFormURL] = useState<string>(props.url)

	// ACTUALIZAR ESTADO CON PROPS
	const { url } = props
	useEffect(() => {
		setFormURL(url)
	}, [url])

	// ACTUALIZAR WHATSAPP , EMAIL
	const handlePhone = (phone: string) => setWhatsappNumber(phone)
	const handleInput = (ev: ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value)

	// ACTUALIZAR NOMBRE DE FORMULARIO
	const updateFormURL = (ev: ChangeEvent<HTMLInputElement>) => setFormURL(ev.target.value)

	const changeSendMethods = (key: 'whatsapp' | 'email') => (ev: ChangeEvent<HTMLInputElement>) => {
		// ACTUALIZAR MÉTODOS DE ENVÍO
		// CHECKED
		const { checked } = ev.target

		// REMOVER
		const methods = [...(props.connectionMethods?.methods || [])].filter(
			(value: 'whatsapp' | 'email') => {
				if (!checked) return value !== key
				else return value
			}
		)

		// AGREGAR
		if (checked) {
			// WHATSAPP
			if (key === 'whatsapp') {
				if (whatsappNumber && whatsappNumber?.toString().length >= 3) {
					setErrs((prevErrs: [boolean, boolean, boolean]) => [false, false, prevErrs[2]])
					methods.push(key)
				} else setErrs((prevErrs: [boolean, boolean, boolean]) => [true, false, prevErrs[2]])
			}

			// EMAIL
			else if (key === 'email') {
				if (email && verifyEmail(email)) {
					setErrs((prevErrs: [boolean, boolean, boolean]) => [false, false, prevErrs[2]])
					methods.push(key)
				} else setErrs((prevErrs: [boolean, boolean, boolean]) => [false, true, prevErrs[2]])
			}
		}

		// ACTUALIZAR
		const updatedMethods: ConnectionMethods = {
			whatsapp: whatsappNumber ? +whatsappNumber : props.connectionMethods?.whatsapp || 0,
			email: email || props.connectionMethods?.email || '',
			methods,
		}

		props.updateConnectionMethods(updatedMethods)
		props.onAnswersConnection(updatedMethods)
		props.onSave(false)
	}

	// ACTUALIZAR PROPS
	const whatsapp = props.connectionMethods?.whatsapp
	const cEmail = props.connectionMethods?.email
	useEffect(() => {
		setEmail(cEmail)
		setWhatsappNumber(whatsapp?.toString())
	}, [whatsapp, cEmail])

	// CERRAR
	const handlePublishOptionsClose = () => {
		// ACTUALIZAR URL
		if (url !== formURL) {
			validateURL(formURL).then((validURL: boolean) => {
				if (validURL) {
					// CERRAR
					props.onClose()

					// BORRAR URL ANTERIOR
					deleteURL(url).then(() => {
						setErrs((prevErrs: [boolean, boolean, boolean]) => [prevErrs[0], prevErrs[1], false])
						props.onChangeURL(formURL)
					})
				} else setErrs((prevErrs: [boolean, boolean, boolean]) => [prevErrs[0], prevErrs[1], true])
			})
		}

		// CERRAR
		else {
			setErrs((prevErrs: [boolean, boolean, boolean]) => [prevErrs[0], prevErrs[1], false])
			props.onClose()
		}
	}

	// SHORT
	const fclt = `fclt.cc/${formURL}`

	return (
		<Menu
			keepMounted
			id='settings-menu'
			open={props.open}
			TransitionComponent={Fade}
			anchorEl={props.publishOptions}
			onClose={handlePublishOptionsClose}>
			<MenuItem onKeyDown={(e) => e.stopPropagation()}>
				<TextField
					fullWidth
					type='text'
					color='primary'
					value={formURL}
					error={errs[2]}
					onChange={updateFormURL}
					label={$`URL del formulario`}
					helperText={errs[2] ? $`Esta url ya está en uso.` : undefined}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Create />
							</InputAdornment>
						),
					}}
				/>
			</MenuItem>
			<MenuItem onKeyDown={(e) => e.stopPropagation()}>
				<Link />
				<a target='_blank' rel='noopener noreferrer' href={`https://${fclt}`} title={fclt}>
					{fclt}
				</a>
			</MenuItem>
			<MenuItem key={`checkLabel_0`} onKeyDown={(e) => e.stopPropagation()}>
				<FormControlLabel
					control={
						<Checkbox
							color='primary'
							onChange={changeSendMethods('whatsapp')}
							style={{ color: '#075e54' }}
							checked={
								props.connectionMethods?.methods
									? props.connectionMethods.methods.includes('whatsapp')
									: false
							}
						/>
					}
					label={
						<div style={{ color: '#075e54' }}>
							{optionIcons[0]} {$`Conectado a WhatsApp`}
						</div>
					}
				/>
				<PhoneField
					error={errs[0]}
					variant='outlined'
					placeholder='+50235678555'
					label={$`Número de WhatsApp`}
					onChange={handlePhone}
					value={whatsappNumber?.toString() || ''}
				/>
			</MenuItem>
			<MenuItem key={`checkLabel_1`} onKeyDown={(e) => e.stopPropagation()}>
				<FormControlLabel
					control={
						<Checkbox
							color='primary'
							onChange={changeSendMethods('email')}
							style={{ color: 'var(--blue)' }}
							checked={
								props.connectionMethods?.methods
									? props.connectionMethods.methods.includes('email')
									: false
							}
						/>
					}
					label={
						<div style={{ color: 'var(--blue)' }}>
							{optionIcons[1]} {$`Conectado a Email`}
						</div>
					}
				/>
				<TextField
					fullWidth
					type='email'
					color='primary'
					error={errs[1]}
					variant='outlined'
					onChange={handleInput}
					label={$`Correo electrónico`}
					placeholder='name@domain.com'
					helperText={errs[1] ? $`Correo electrónico no valido` : undefined}
					value={email || ''}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Email />
							</InputAdornment>
						),
					}}
				/>
			</MenuItem>{' '}
		</Menu>
	)
}

export default SettingsMenu
