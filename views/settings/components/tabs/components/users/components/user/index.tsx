import React from 'react'

// NEXT
import Image from 'next/image'

// MATERIAl
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// HOOKS
import useStrings from 'hooks/lang'
import getUserRoles from './tools'

// ESTILOS
import Styles from './style.module.scss'

// PROPS
interface UserProps {
	user: User
	onSelect: (ev: SelectChangeEvent) => void
}

const User: React.FC<UserProps> = ({ user, onSelect }) => {
	// STRINGS
	const { $ } = useStrings()

	// ROLES
	const userRoles = getUserRoles($)

	return (
		<div className={Styles.container}>
			<div className={Styles.image}>
				{user.picture && (
					<Image unoptimized src={user.picture} alt={user.name} height={50} width={50} />
				)}
			</div>
			<div className={Styles.info}>
				<strong>{user.name}</strong>
				<p>{user.email}</p>
			</div>
			<FormControl fullWidth variant='outlined'>
				<InputLabel htmlFor='role' id='role-label'>{$`Seleccionar cargo`}</InputLabel>
				<Select
					id='role'
					name='role'
					color='primary'
					variant='outlined'
					onChange={onSelect}
					labelId='role-label'
					label={$`Seleccionar cargo`}
					defaultValue={user.role ?? ''}
					inputProps={{
						name: 'role',
						id: 'role',
					}}>
					{userRoles?.map((role) => (
						<MenuItem key={role.name} value={role.name}>
							{role.text}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}

export default User
