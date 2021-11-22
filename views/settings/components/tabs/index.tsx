// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

// ICONS
import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'

// COMPONENTES
import Payments from './components/payments'
import General from './components/general'
import Users from './components/users'
import Bank from './components/bank'

// HOOKS
import useStrings from 'hooks/lang'

// CONTEXTO
import { GeneralProps } from './tools'

// PROPS
const CustomTabs: React.FC<GeneralProps> = ({
	userRoles,
	businessRef,
	bannerRef,
	backgroundRef,
}) => {
	// ESTADOS
	const [tabIndex, setTabIndex] = useState<number>(0)

	// STRINGS
	const { $ } = useStrings()

	// ACTUALIZAR
	const handleChange = (_event: unknown, newValue: number) => setTabIndex(newValue)

	return (
		<div className={Styles.container}>
			<Paper style={{ background: '#fcfcfc', width: '540px' }}>
				<Tabs
					value={tabIndex}
					textColor='primary'
					className={Styles.tabs}
					indicatorColor='primary'
					onChange={handleChange}
					aria-label='settings_sections'>
					<Tab className={Styles.tab} icon={<InfoTwoToneIcon />} label={$`General`} />
					<Tab className={Styles.tab} icon={<MenuBookTwoToneIcon />} label={$`Bancaria`} />
					<Tab className={Styles.tab} icon={<ExtensionTwoToneIcon />} label={$`Pago`} />
					<Tab className={Styles.tab} icon={<SettingsTwoToneIcon />} label={$`Usuarios`} />
				</Tabs>
				<Payments
					show={tabIndex === 2}
					businessRef={businessRef}
					userRoles={userRoles}
					bannerRef={bannerRef}
					backgroundRef={backgroundRef}
				/>
				<General
					show={tabIndex === 0}
					businessRef={businessRef}
					userRoles={userRoles}
					bannerRef={bannerRef}
					backgroundRef={backgroundRef}
				/>
				<Users
					show={tabIndex === 3}
					businessRef={businessRef}
					userRoles={userRoles}
					bannerRef={bannerRef}
					backgroundRef={backgroundRef}
				/>
				<Bank
					show={tabIndex === 1}
					businessRef={businessRef}
					userRoles={userRoles}
					bannerRef={bannerRef}
					backgroundRef={backgroundRef}
				/>
			</Paper>
		</div>
	)
}

export default CustomTabs
