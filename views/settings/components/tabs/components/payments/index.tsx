// REACT
import React, { useContext, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import ColorButton from 'components/button'
import TabInfo from '../tabInfo'
import Card from './components/card'

// ICONOS
import AddTwoTone from '@mui/icons-material/AddTwoTone'

// HOOKS
import addAccount, { deleteAccount, setAccountAsMain } from './tools'
import useStrings from 'hooks/lang'

// CONTEXTO
import SettingsContext from 'views/settings/context'

interface TabProps {
	show: boolean
}
const Payments: React.FC<TabProps> = ({ show }) => {
	// STRINGS
	const { $ } = useStrings()

	// CONTEXTO
	const { businessRef } = useContext(SettingsContext)

	// CUENTAS
	const [accounts, setAccounts] = useState<CompanyPaymentAccount[]>(
		businessRef.current?.paymentAccounts ?? []
	)

	// AGREGAR CUENTA
	const handleAccount = () => addAccount(businessRef, setAccounts)

	// BORRAR CUENTA
	const deleteAccountEv = (index: number) => () => deleteAccount(businessRef, setAccounts, index)

	// HACER UNA CUENTA COMO PRINCIPAL
	const setMain = (index: number) => () => setAccountAsMain(businessRef, setAccounts, index)

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TabInfo
				title={$`Configurar pagos`}
				body={$`Tus datos bancarios son confidenciales y solo se usaran para procesar tu suscripción.`}>
				<ColorButton
					color='primary'
					variant='outlined'
					onClick={handleAccount}
					startIcon={<AddTwoTone />}
					$style={{
						color: 'var(--primary)',
						borderColor: 'var(--primary)',
					}}>{$`Agregar`}</ColorButton>
			</TabInfo>
			<div className={Styles.cards}>
				{accounts.map((payment, index) => (
					<Card
						card={payment}
						onSetMain={setMain(index)}
						onDelete={deleteAccountEv(index)}
						key={`${payment.account}_${index}`}
					/>
				))}
			</div>
		</div>
	)
}

export default Payments
