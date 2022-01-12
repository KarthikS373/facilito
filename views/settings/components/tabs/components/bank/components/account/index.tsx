import React, { useContext } from 'react'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// ICONOS
import FormatColorTextTwoToneIcon from '@mui/icons-material/FormatColorTextTwoTone'
import Grid3x3TwoToneIcon from '@mui/icons-material/Grid3x3TwoTone'
import Delete from '@mui/icons-material/DeleteTwoTone'

// TOOLS
import onChangeInput, { onChangeAccountType } from './tools'
import getBankAccountType from './utils'
import useStrings from 'hooks/lang'

// CONTEXTO
import SettingsContext from 'views/settings/context'

// ESTILOS
import Styles from './style.module.scss'

// PROPS
interface AccountProps {
	index: number
	account: CompanyBankAccount
	onDelete: EmptyFunction
}

const Account: React.FC<AccountProps> = ({ index, account, onDelete }) => {
	// STRINGS
	const { $ } = useStrings()

	// CONTEXTO
	const { businessRef } = useContext(SettingsContext)

	// GUARDAR
	const handleInputs = (ev: React.ChangeEvent<HTMLInputElement>) =>
		onChangeInput(ev, index, businessRef)

	// GUARDAR TIPO DE CUENTA
	const handleAccountType = (ev: SelectChangeEvent) => onChangeAccountType(ev, index, businessRef)

	// TIPO DE CUENTAS
	const accountTypes = getBankAccountType($)

	return (
		<div className={Styles.container}>
			<TextField
				fullWidth
				id='nameAccount'
				name='nameAccount'
				variant='outlined'
				onChange={handleInputs}
				label={$`Nombre de la cuenta`}
				placeholder={$`Titular de cuenta`}
				defaultValue={account.nameAccount ?? ''}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<FormatColorTextTwoToneIcon color='primary' />
						</InputAdornment>
					),
				}}
			/>

			<TextField
				fullWidth
				id='noAccount'
				name='noAccount'
				variant='outlined'
				onChange={handleInputs}
				label={$`Numero de la cuenta`}
				placeholder={$`12316546154`}
				defaultValue={account.noAccount ?? ''}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Grid3x3TwoToneIcon color='primary' />
						</InputAdornment>
					),
				}}
			/>

			<FormControl fullWidth variant='outlined'>
				<InputLabel htmlFor='category' id='category-label'>{$`Tipo de cuenta`}</InputLabel>
				<Select
					id='typeAccount'
					name='typeAccount'
					color='primary'
					variant='outlined'
					label={$`Tipo de cuenta`}
					onChange={handleAccountType}
					labelId='category-label'
					defaultValue={account.typeAccount ?? ''}
					inputProps={{
						name: 'typeAccount',
						id: 'typeAccount',
					}}>
					{accountTypes?.map((accountType: string) => (
						<MenuItem key={accountType} value={accountType}>
							{accountType}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<TextField
				fullWidth
				id='bank'
				name='bank'
				variant='outlined'
				onChange={handleInputs}
				label={$`Nombre del banco`}
				placeholder={$`Banco internacional`}
				defaultValue={account.bank ?? ''}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Grid3x3TwoToneIcon color='primary' />
						</InputAdornment>
					),
				}}
			/>
			<div className={Styles.actions}>
				<Button onClick={onDelete} variant='outlined' color='error' startIcon={<Delete />}>
					{$`Eliminar cuenta`}
				</Button>
			</div>
		</div>
	)
}

export default Account
