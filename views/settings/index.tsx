import React, { useContext, useRef, useState } from 'react'

// COMPONENTES
import Customize from './components/customize'
import ColorButton from 'components/button'
import Header from 'components/header'
import Info from './components/info'
import Tabs from './components/tabs'
import View from 'components/view'

// ICONOS
import SaveTwoTone from '@mui/icons-material/SaveTwoTone'

// TOOLS
import { UserRole } from './components/tabs/components/users/tools'
import saveBusiness, { openSub } from './tools'
import BusinessContext from 'context/business'
import defBusiness from './utils/initials'
import useStrings from 'hooks/lang'

// CONTEXTO
import SettingsContext from './context'

// ESTILOS
import Styles from './style.module.scss'
import UserContext from 'context/user'

const SettingsView: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// USUARIO
	const { user } = useContext(UserContext)

	// COMPANY
	const businessCtx = useContext(BusinessContext)
	const business = businessCtx.business

	// FONDO
	const [customBackground, setCustomBackground] = useState<string | undefined>()

	// TABS
	const [tabIndex, setTabIndex] = useState<number>(0)

	// REFERENCIAS
	const businessRef = useRef(business ?? defBusiness)
	businessRef.current = business ?? defBusiness

	const backgroundRef: React.MutableRefObject<File | string> = useRef('')
	const bannerRef: React.MutableRefObject<File | string> = useRef('')

	// ROLES
	const userRoles = useRef<UserRole[]>([])

	// ABRIR SUBSCRIPCION
	const openSubEv = () => openSub(setTabIndex, user?.role)

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
			<Header customBackground={customBackground}>
				<ColorButton
					color='primary'
					variant='contained'
					onClick={saveBusinessEv}
					startIcon={<SaveTwoTone />}
					$style={{ background: 'var(--primary)', color: '#fff' }}>
					{$`Guardar datos`}
				</ColorButton>
			</Header>
			<Info onAction={openSubEv} />
			<div className={Styles.container}>
				<SettingsContext.Provider
					value={{
						userRoles,
						bannerRef,
						businessRef,
						backgroundRef,
						setCustomBackground,
					}}>
					<Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
					<Customize />
				</SettingsContext.Provider>
			</div>
		</View>
	)
}

export default SettingsView
