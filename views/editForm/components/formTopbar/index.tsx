// REACT
import React, { useContext, useState, useEffect } from 'react'

// ICONOS
import RoomPreferencesTwoToneIcon from '@mui/icons-material/RoomPreferencesTwoTone'
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone'
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone'
import PublicOffTwoTone from '@mui/icons-material/PublicOffTwoTone'
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone'
import ShareTwoTone from '@mui/icons-material/ShareTwoTone'
import SettingsIcon from '@mui/icons-material/Settings'
import ReceiptIcon from '@mui/icons-material/Receipt'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import MenuList from '@mui/material/MenuList'
import Button from '@mui/material/Button'

// COMPONENTES
import AccountButton from 'components/layout/components/topbar/components/accountButton'
import { FormTopbarProps } from './components/settingsMenu/tools'
import showSettingsMenu from './components/settingsMenu'
import publishFormEvent from './components/publishForm'
import showCheckoutAlert from './components/checkout'
import SaveOnCloud from './components/saveOnCloud'
import PopperMenuList from 'components/popperMenu'
import showShareMenu from './components/shareMenu'

// HOOKS
import useStrings from 'hooks/lang'
import updateTitle from './tools'

// CONTEXTO
import BusinessContext from 'context/business'

// ESTILOS
import Styles from './style.module.scss'

const FormTopbar: React.FC<FormTopbarProps> = (defProps: FormTopbarProps) => {
	// BUSINESS
	const company = useContext(BusinessContext)

	const [props, setProps] = useState<FormTopbarProps>(defProps)

	// MENU DE OPCIONES
	const [settingsMenu, setSettingsMenu] = useState<HTMLElement | null>(null)
	const openSettingsMenu = Boolean(settingsMenu)

	// CERRAR MENU
	const onClose = () => setSettingsMenu(null)

	// ABRIR MENU
	const openMenu = (ev: React.MouseEvent<HTMLButtonElement>) => setSettingsMenu(ev.currentTarget)

	// STRINGS
	const { $ } = useStrings()

	// ENVIAR INPUT
	const sendTitle = (ev: React.ChangeEvent) => updateTitle(ev, props.onTitle)

	// MOSTRAR MENU DE COMPARTIR
	const openShareMenu = () => showShareMenu(props.formQR, props.id, props.url)

	// MOSTRAR MENU DE OPCIONES
	const openFormSettingsMenu = () => showSettingsMenu(props)

	// MOSTRAR MENU DE PUBLICACION
	const showPublishMenu = () => publishFormEvent($, props, props.public, company.business)

	// ABRIR MENU DE CHECKOUT
	const openCheckoutMenu = () =>
		showCheckoutAlert(
			$,
			props.checkoutOptions,
			company.business?.badge ?? '',
			props.onChangeCheckoutOptions
		)

	useEffect(() => {
		setProps(props)
	}, [props])

	return (
		<>
			{/* MENU DE OPCIONES */}
			<PopperMenuList
				onClose={onClose}
				anchorEl={settingsMenu}
				open={openSettingsMenu}
				placement='bottom-end'>
				<MenuList onClick={props.onCustomize} className={Styles.menuItem}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<PaletteTwoToneIcon />}>{$`Personalizar`}</Button>
				</MenuList>
				<MenuList onClick={openFormSettingsMenu} className={Styles.menuItem}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<RoomPreferencesTwoToneIcon />}>{$`Preferencias`}</Button>
				</MenuList>
				<MenuList onClick={showPublishMenu} className={Styles.menuItem}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={props.public ? <PublicOffTwoTone /> : <PublicTwoToneIcon />}>
						{props.public ? $`Ocultar` : $`Publicar`}
					</Button>
				</MenuList>
				<MenuList onClick={openShareMenu} className={Styles.menuItem}>
					<Button fullWidth variant='outlined' startIcon={<ShareTwoTone />}>{$`Compartir`}</Button>
				</MenuList>
			</PopperMenuList>
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
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<BorderColorTwoToneIcon />
							</InputAdornment>
						),
					}}
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

					<Button variant='outlined' onClick={openMenu} startIcon={<SettingsIcon />}>
						{$`Configuración`}
					</Button>

					{/* CUENTA */}
					<AccountButton disablePortal={false} />
				</div>
			</div>
		</>
	)
}

export default FormTopbar
