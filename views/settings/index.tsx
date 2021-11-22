import React, { useContext, useRef } from 'react'

// COMPONENTES
import Customize from './components/customize'
import ColorButton from 'components/button'
import PageInfo from 'components/pageInfo'
import Header from 'components/header'
import Tabs from './components/tabs'
import View from 'components/view'

// ICONOS
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone'
import SaveTwoTone from '@mui/icons-material/SaveTwoTone'

// TOOLS
import { UserRole } from './components/tabs/components/users/tools'
import BusinessContext from 'context/business'
import defBusiness from './utils/initials'
import useStrings from 'hooks/lang'
import saveBusiness from './tools'

// ESTILOS
import Styles from './style.module.scss'

const SettingsView: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// COMPANY
	const businessCtx = useContext(BusinessContext)
	const business = businessCtx.business

	// REFERENCIAS
	const businessRef = useRef(business ?? defBusiness)
	businessRef.current = business ?? defBusiness

	const backgroundRef: React.MutableRefObject<File | string> = useRef('')
	const bannerRef: React.MutableRefObject<File | string> = useRef('')

	// ROLES
	const userRoles = useRef<UserRole[]>([])

	// GUARDAR
	const saveBusinessEv = () =>
		saveBusiness(
			businessCtx.setBusinessDB,
			businessRef,
			userRoles,
			backgroundRef,
			bannerRef,
			businessCtx.business?.id
		)

	return (
		<View>
			<Header>
				<ColorButton
					color='primary'
					variant='contained'
					onClick={saveBusinessEv}
					startIcon={<SaveTwoTone />}
					$style={{ background: 'var(--primary)', color: '#fff' }}>
					{$`Guardar datos`}
				</ColorButton>
			</Header>
			<PageInfo
				title={$`Configurar negocio`}
				description={$`Agregar informacion general y bancaria sobre el negocio.`}
				icon={<AdminPanelSettingsTwoToneIcon />}
			/>
			<div className={Styles.container}>
				<Tabs
					show
					userRoles={userRoles}
					bannerRef={bannerRef}
					businessRef={businessRef}
					backgroundRef={backgroundRef}
				/>
				<Customize
					show
					userRoles={userRoles}
					bannerRef={bannerRef}
					businessRef={businessRef}
					backgroundRef={backgroundRef}
				/>
			</div>
		</View>
	)
}

export default SettingsView
