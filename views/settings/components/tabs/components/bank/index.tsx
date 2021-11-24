import React, { useContext, useState } from 'react'

// COMPONENTES
import ColorButton from 'components/button'
import Account from './components/account'
import TabInfo from '../tabInfo'

// ICONOS
import AddTwoTone from '@mui/icons-material/AddTwoTone'

// ESTILOS
import Styles from './style.module.scss'

// HOOKS
import addAccount, { deleteAccount } from './tools'
import useStrings from 'hooks/lang'

// CONTEXTO
import SettingsContext from 'views/settings/context'

interface TabProps {
	show: boolean
}
const Bank: React.FC<TabProps> = ({ show }) => {
	// STRINGS
	const { $ } = useStrings()

	// CONTEXTO
	const props = useContext(SettingsContext)

	// CUENTAS
	const [accounts, setAccounts] = useState<CompanyBankAccount[]>(
		props.businessRef.current?.bankAccounts ?? []
	)

	// AGREGAR CUENTA
	const handleAccount = () => addAccount(setAccounts)

	// BORRAR CUENTA
	const deleteAccountEv = (index: number) => () =>
		deleteAccount(props.businessRef, setAccounts, index)

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TabInfo
				title={$`Informacion bancaria`}
				body={$`Tus datos bancarios se mostraran al realizar pagos con transferencia en las tiendas.`}>
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
			<div className={Styles.accounts}>
				{accounts.map((account, index) => (
					<Account
						index={index}
						account={account}
						key={`account_${index}`}
						onDelete={deleteAccountEv(index)}
					/>
				))}
			</div>
		</div>
	)
}

export default Bank
