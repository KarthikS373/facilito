// REACT
import React, { useState, useContext } from 'react'

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
	validateFclt,
} from './tools'
import FormsContext from 'context/forms'
import useStrings from 'hooks/lang'
import useDefProps from './hooks'

// ESTILOS
import Styles from './style.module.scss'
import { useTheme } from '@mui/material/styles'

// ICONOS
const optionIcons = [
	<WhatsApp key='w_1' color='primary' />,
	<Email key='e_1' color='primary' />,
	<Cloud key='c_1' color='primary' />,
]

const SettingsMenu: React.FC<FormTopbarProps> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	// FORMULARIO
	const formsCtx = useContext(FormsContext)

	// ESTADO
	const [formData, setFormData] = useState<SendData>({ ...getDefValues(props.formData) })

	// URL ERROR
	const [urlError, setUrlError] = useState<boolean>(false)

	// SHORT
	const fclt = `fclt.cc/${formData.link}`

	// ACTUALIZAR WHATSAPP , EMAIL
	const handleData =
		<T,>(field: string) =>
		(ev: T) =>
			handleInputs(ev, field, setFormData)

	// VALIDAR URL
	const validateLink = () => validateFclt(props, formsCtx, formData, setUrlError, urlError)

	// TEMA
	const theme = useTheme()

	// ACTUALIZAR INPUTS
	const changeSendMethodsEv =
		(key: 'whatsapp' | 'email') => (ev: React.ChangeEvent<HTMLInputElement>) =>
			handleChecks(key, ev, setFormData)

	// HOOKS
	useDefProps(setFormData, props.formData)

	console.log(formData)

	return (
		<div className={Styles.container}>
			<div className={Styles.content}>
				<TextField
					fullWidth
					type='text'
					name='link'
					color='primary'
					value={formData.link}
					onChange={handleData('link')}
					label={$`URL de la tienda`}
					helperText={urlError ? $`Esta url ya está en uso.` : undefined}
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
						variant='outlined'
						placeholder='+50235678555'
						label={$`Número de WhatsApp`}
						onChange={handleData('whatsapp')}
						value={formData.whatsapp?.toString() ?? '0'}
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
						variant='outlined'
						onChange={handleData('email')}
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
const showSettingsMenu = (props: FormTopbarProps): void => {
	window.Alert({
		title: 'Ajustes globales',
		body: 'Configura el tu link dinamico (fclt) y las opciones de envio de respuestas para tu tienda.',
		type: 'confirm',
		hideActions: true,
		customElements: <SettingsMenu {...props} />,
	})
}

export default showSettingsMenu
