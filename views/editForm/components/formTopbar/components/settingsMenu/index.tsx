// REACT
import React, { useState } from 'react'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button/Button'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'

// COMPONENTES
import PhoneField from 'components/phoneInput'
import ColorButton from 'components/button'

// ICONOS
import SaveTwoTone from '@mui/icons-material/SaveTwoTone'
import WhatsApp from '@mui/icons-material/WhatsApp'
import Create from '@mui/icons-material/Create'
import Email from '@mui/icons-material/Email'
import Cloud from '@mui/icons-material/Cloud'
import Link from '@mui/icons-material/Link'

// TOOLS
import handleChecks, {
	FormTopbarProps,
	getDefValues,
	handleInputs,
	SendData,
	SettingsMenuProps,
	validateFclt,
} from './tools'
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'
import { useTheme } from '@mui/material/styles'
import useDefProps from './hooks'

// ICONOS
const optionIcons = [
	<WhatsApp key='w_1' color='primary' />,
	<Email key='e_1' color='primary' />,
	<Cloud key='c_1' color='primary' />,
]

const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	// ESTADO
	const [formData, setFormData] = useState<SendData>(
		getDefValues(props.url, props.connectionMethods)
	)

	// ERRORES [whatsapp, email, link]
	const [errs, setErrs] = useState<[boolean, boolean, boolean]>([false, false, false])

	// SHORT
	const fclt = `fclt.cc/${formData.link}`

	// ACTUALIZAR WHATSAPP , EMAIL
	const handleData = <T,>(ev: T) => handleInputs(ev, setFormData, setErrs)

	// VALIDAR URL
	const validateLink = () => validateFclt(props, formData, setErrs, errs)

	// TEMA
	const theme = useTheme()

	// ACTUALIZAR INPUTS
	const changeSendMethodsEv =
		(key: 'whatsapp' | 'email') => (ev: React.ChangeEvent<HTMLInputElement>) =>
			handleChecks(key, ev, setErrs, setFormData)

	// HOOKS
	useDefProps(props.url, setFormData, props.connectionMethods)

	return (
		<div className={Styles.container}>
			<div className={Styles.content}>
				<TextField
					fullWidth
					type='text'
					name='link'
					color='primary'
					error={errs[2]}
					value={formData.link}
					onChange={handleData}
					label={$`URL de la tienda`}
					helperText={errs[2] ? $`Esta url ya está en uso.` : undefined}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Create />
							</InputAdornment>
						),
					}}
				/>
				<div className={Styles.link}>
					<Link color='primary' />
					<a
						title={fclt}
						target='_blank'
						href={`https://${fclt}`}
						rel='noopener noreferrer'
						style={{ color: theme.palette.primary.main }}>
						{fclt}
					</a>
				</div>
				<div>
					<FormControlLabel
						className={Styles.check}
						control={
							<Checkbox
								color='primary'
								onChange={changeSendMethodsEv('whatsapp')}
								checked={formData.methods?.includes('whatsapp') ?? false}
							/>
						}
						label={
							<div className={Styles.label}>
								{optionIcons[0]} {$`Conectado a WhatsApp`}
							</div>
						}
					/>
					<PhoneField
						name='whatsapp'
						error={errs[0]}
						variant='outlined'
						onChange={handleData}
						placeholder='+50235678555'
						label={$`Número de WhatsApp`}
						value={formData.whatsapp.toString() ?? ''}
					/>
				</div>
				<div>
					<FormControlLabel
						className={Styles.check}
						control={
							<Checkbox
								color='primary'
								onChange={changeSendMethodsEv('email')}
								checked={formData.methods?.includes('email') ?? false}
							/>
						}
						label={
							<div className={Styles.label}>
								{optionIcons[1]} {$`Conectado a Email`}
							</div>
						}
					/>
					<TextField
						fullWidth
						name='email'
						type='email'
						color='primary'
						error={errs[1]}
						variant='outlined'
						onChange={handleData}
						label={$`Correo electrónico`}
						placeholder='name@domain.com'
						value={formData.email ?? ''}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Email color='primary' />
								</InputAdornment>
							),
						}}
					/>
				</div>
			</div>
			<div className={Styles.actions}>
				<Button fullWidth onClick={window.hideAlert}>{$`Cancelar`}</Button>
				<ColorButton
					fullWidth
					variant='contained'
					onClick={validateLink}
					startIcon={<SaveTwoTone />}
					$style={{
						width: 130,
						background: theme.palette.primary.main,
						color: '#fff',
					}}>{$`Guardar`}</ColorButton>
			</div>
		</div>
	)
}

// MOSTRAR MENU
const showSettingsMenu = (
	props: FormTopbarProps,
	setConnectionMethods: React.Dispatch<React.SetStateAction<ConnectionMethods | undefined>>,
	connectionMethods?: ConnectionMethods
): void => {
	window.Alert({
		title: 'Ajustes globales',
		body: 'Configura el tu link dinamico (fclt) y las opciones de envio de respuestas para tu tienda.',
		type: 'confirm',
		hideActions: true,
		customElements: (
			<SettingsMenu
				{...props}
				setConnectionMethods={setConnectionMethods}
				connectionMethods={connectionMethods}
			/>
		),
	})
}

export default showSettingsMenu
