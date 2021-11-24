// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

// ICONS
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'

// COMPONENTES
import Payments from './components/payments'
import General from './components/general'
import Users from './components/users'
import Bank from './components/bank'

// HOOKS
import useStrings from 'hooks/lang'

// PROPS
const CustomTabs: React.FC = () => {
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
					<Tab className={Styles.tab} icon={<AccountBalanceTwoToneIcon />} label={$`Bancaria`} />
					<Tab className={Styles.tab} icon={<PaymentTwoToneIcon />} label={$`Pago`} />
					<Tab className={Styles.tab} icon={<PeopleAltTwoToneIcon />} label={$`Usuarios`} />
				</Tabs>
				<Payments show={tabIndex === 2} />
				<General show={tabIndex === 0} />
				<Users show={tabIndex === 3} />
				<Bank show={tabIndex === 1} />
			</Paper>
		</div>
	)
}

export default CustomTabs
