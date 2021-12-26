// REACT
import React, { useContext, useState } from 'react'

// ICONOS
import RoomPreferencesTwoToneIcon from '@mui/icons-material/RoomPreferencesTwoTone'
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone'
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone'
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
import useStateProps from './hooks'
import useStrings from 'hooks/lang'
import updateTitle from './tools'

// CONTEXTO
import BusinessContext from 'context/business'

// ESTILOS
import Styles from './style.module.scss'
import ROUTES from 'router/routes'

const FormTopbar: React.FC<FormTopbarProps> = (props: FormTopbarProps) => {
	// BUSINESS
	const company = useContext(BusinessContext)

	// MÉTODOS DE CONEXIÓN
	const [connectionMethods, setConnectionMethods] = useState<ConnectionMethods | undefined>(
		props.answersConnection
	)

	// PUBLICAR
	const [published, setPublished] = useState<boolean>(props.public)

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
	const openFormSettingsMenu = () =>
		showSettingsMenu(props, setConnectionMethods, connectionMethods)

	// MOSTRAR MENU DE PUBLICACION
	const showPublishMenu = () =>
		publishFormEvent($, props, published, setPublished, setConnectionMethods, company.business)

	// ABRIR MENU DE CHECKOUT
	const openCheckoutMenu = () =>
		showCheckoutAlert(
			$,
			props.checkoutOptions,
			company.business?.badge ?? '',
			props.onChangeCheckoutOptions,
			company.business?.permissions
		)

	// ACTUALIZAR ESTADO DE PUBLICACIÓN
	useStateProps(props.public, props.answersConnection, setPublished, setConnectionMethods)

	return (
		<>
			{/* MENU DE OPCIONES */}
			<PopperMenuList
				onClose={onClose}
				anchorEl={settingsMenu}
				open={openSettingsMenu}
				style={{ zIndex: 10 }}
				disablePortal={false}
				placement='bottom-end'>
				{/* PERSONALIZAR */}
				<MenuList onClick={props.onCustomize} className={Styles.menuItem}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<PaletteTwoToneIcon />}>{$`Personalizar`}</Button>
				</MenuList>

				{/* AJUSTES */}
				<MenuList onClick={openFormSettingsMenu} className={Styles.menuItem}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<RoomPreferencesTwoToneIcon />}>{$`Preferencias`}</Button>
				</MenuList>

				{/* PUBLICAR */}
				<MenuList onClick={showPublishMenu} className={Styles.menuItem}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={published ? <PublicOffTwoTone /> : <PublicTwoToneIcon />}>
						{published ? $`Ocultar` : $`Publicar`}
					</Button>
				</MenuList>

				{/* CHECKOUT */}
				<MenuList onClick={openCheckoutMenu} className={Styles.menuItem}>
					<Button fullWidth variant='outlined' startIcon={<ReceiptIcon />}>
						{$`Checkout`}
					</Button>
				</MenuList>

				{/* COMPARTIR */}
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
					placeholder={$`Titulo de la tienda`}
				/>

				<div className={Styles.actions}>
					<Button variant='outlined' onClick={openMenu} startIcon={<SettingsIcon />}>
						{$`Configuración`}
					</Button>

					{/* VISUALIZAR */}
					<a
						target='_blank'
						title={props.url}
						rel='noreferrer noopener'
						href={ROUTES.form
							.replace(':formURL', props.url)
							.replace(':companyURL', company.business?.url ?? '')}>
						<Button
							fullWidth
							variant='outlined'
							startIcon={<VisibilityTwoTone />}>{$`Visualizar`}</Button>
					</a>

					{/* GUARDAR */}
					<SaveOnCloud onSave={props.onSave} />

					{/* CUENTA */}
					<AccountButton />
				</div>
			</div>
		</>
	)
}

export default FormTopbar
