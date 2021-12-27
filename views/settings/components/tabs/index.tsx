// REACT
import React, { useContext } from 'react'

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
import UserContext from 'context/user'
import useStrings from 'hooks/lang'

// PROPS
interface TabsProps {
	tabIndex: number
	setTabIndex: SetState<number>
}
const CustomTabs: React.FC<TabsProps> = ({ tabIndex, setTabIndex }) => {
	// STRINGS
	const { $ } = useStrings()

	// USUARIO
	const { user } = useContext(UserContext)

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
					{user?.role === 'admin' && (
						<>
							{' '}
							<Tab className={Styles.tab} icon={<PaymentTwoToneIcon />} label={$`Pago`} />
							<Tab className={Styles.tab} icon={<PeopleAltTwoToneIcon />} label={$`Usuarios`} />
						</>
					)}
				</Tabs>

				<Bank show={tabIndex === 1} />
				<General show={tabIndex === 0} />
				{user?.role === 'admin' && (
					<>
						<Users show={tabIndex === 3} />
						<Payments show={tabIndex === 2} />
					</>
				)}
			</Paper>
		</div>
	)
}

export default CustomTabs
