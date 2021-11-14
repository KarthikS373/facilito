// REACT
import React, { useContext } from 'react'

// ICONOS
import SettingsIcon from '@mui/icons-material/Settings'
import ReceiptIcon from '@mui/icons-material/Receipt'
import IconButton from '@mui/material/IconButton'

// MATERIAL
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// COMPONENTES
import AccountButton from 'components/layout/components/topbar/components/accountButton'
import showCheckoutAlert from './components/checkout'
import SaveOnCloud from './components/saveOnCloud'

// HOOKS
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

// ESTILOS
import Styles from './style.module.scss'
import updateTitle from './tools'

// PROPIEDADES
interface FormTopbarProps {
	onAnswersConnection: (answersConnection?: ConnectionMethods) => unknown
	onChangeCheckoutOptions?: (options: FormCheckout) => unknown
	onChangeURL: (url: string) => Promise<void>
	onPublish: (published: boolean) => unknown
	answersConnection?: ConnectionMethods
	onTitle: (title: string) => unknown
	onSave: (ctrl: boolean) => unknown
	checkoutOptions?: FormCheckout
	onCustomize: EmptyFunction
	defValue?: string
	public: boolean
	formQR: string
	url: string
	id: string
}

const FormTopbar: React.FC<FormTopbarProps> = (props: FormTopbarProps) => {
	// BUSINESS
	const company = useContext(BusinessContext)

	// STRINGS
	const { $ } = useStrings()

	// ENVIAR INPUT
	const sendTitle = (ev: React.ChangeEvent) => updateTitle(ev, props.onTitle)

	// ABRIR MENU DE CHECKOUT
	const openCheckoutMenu = () =>
		showCheckoutAlert(
			$,
			props.checkoutOptions,
			company.business?.badge ?? '',
			props.onChangeCheckoutOptions
		)

	return (
		<div className={Styles.container}>
			{/* TITULO */}
			<TextField
				id='title'
				multiline
				type='text'
				name='title'
				maxRows={2}
				autoComplete='off'
				onChange={sendTitle}
				className={Styles.titleInp}
				defaultValue={props.defValue}
				placeholder={$`Titulo del formulario`}
			/>

			<div className={Styles.actions}>
				{/* CONFIGURACION */}
				<Button variant='outlined' onClick={openCheckoutMenu} startIcon={<ReceiptIcon />}>
					{$`Checkout`}
				</Button>

				{/* GUARDAR */}
				<SaveOnCloud onSave={props.onSave} />

				<IconButton>
					<SettingsIcon />
				</IconButton>

				{/* CUENTA */}
				<AccountButton />
			</div>
		</div>
	)
}

export default FormTopbar
