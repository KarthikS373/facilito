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
import useStrings from 'hooks/lang'
import updateTitle from './tools'

// CONTEXTO
import BusinessContext from 'context/business'
import FormsContext from 'context/forms'

// ESTILOS
import Styles from './style.module.scss'
import ROUTES from 'router/routes'

const FormTopbar: React.FC<FormTopbarProps> = (props: FormTopbarProps) => {
	// BUSINESS
	const company = useContext(BusinessContext)

	// FORMULARIO
	const formsCtx = useContext(FormsContext)

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
	const openShareMenu = () => showShareMenu(props.formData)

	// MOSTRAR MENU DE OPCIONES
	const openFormSettingsMenu = () => showSettingsMenu(props)

	// MOSTRAR MENU DE PUBLICACION
	const showPublishMenu = () => publishFormEvent($, props, company.business)

	// ABRIR MENU DE CHECKOUT
	const openCheckoutMenu = () =>
		showCheckoutAlert($, props.formData, formsCtx, company.business, props.onSave)

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
						startIcon={
							props.formData.current.public ? <PublicOffTwoTone /> : <PublicTwoToneIcon />
						}>
						{props.formData.current.public ? $`Ocultar` : $`Publicar`}
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
					value={props.formData.current.title}
					placeholder={$`Titulo de la tienda`}
				/>

				<div className={Styles.actions}>
					<Button variant='outlined' onClick={openMenu} startIcon={<SettingsIcon />}>
						{$`Configuración`}
					</Button>

					{/* VISUALIZAR */}
					<a
						target='_blank'
						title={props.formData.current.url}
						rel='noreferrer noopener'
						href={ROUTES.form
							.replace(':formURL', props.formData.current.url)
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
