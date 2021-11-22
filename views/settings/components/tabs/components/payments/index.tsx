// REACT
import React, { useState } from 'react'

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
import type { GeneralProps } from '../../tools'
import useStrings from 'hooks/lang'

const Payments: React.FC<GeneralProps> = ({ show, businessRef }) => {
	// STRINGS
	const { $ } = useStrings()

	// CUENTAS
	const [accounts, setAccounts] = useState<CompanyPaymentAccount[]>(
		businessRef.current?.paymentAccounts ?? []
	)

	// AGREGAR CUENTA
	const handleAccount = () => addAccount(setAccounts)

	// BORRAR CUENTA
	const deleteAccountEv = (index: number) => () => deleteAccount(setAccounts, index)

	// HACER UNA CUENTA COMO PRINCIPAL
	const setMain = (index: number) => () => setAccountAsMain(setAccounts, index)

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
