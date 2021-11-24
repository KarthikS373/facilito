// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import { SelectChangeEvent } from '@mui/material/Select'

// COMPONENTES
import User from './components/user'
import TabInfo from '../tabInfo'

// TOOLS
import changeUserRole from './tools'
import useStrings from 'hooks/lang'
import useUsers from './hooks'

// CONTEXTO
import SettingsContext from 'views/settings/context'

interface TabProps {
	show: boolean
}
const Users: React.FC<TabProps> = ({ show }) => {
	// STRINGS
	const { $ } = useStrings()

	// USUARIOS
	const [users, setUsers] = useState<User[]>([])

	// CONTEXTO
	const { businessRef, userRoles } = useContext(SettingsContext)

	// CAMBIAR ROLE
	const onSelect = (email: string) => (ev: SelectChangeEvent) =>
		changeUserRole(ev, email, userRoles)

	// HOOKS
	useUsers(businessRef.current?.users ?? [], setUsers, userRoles)

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TabInfo
				title={$`Administrar usuarios`}
				body={$`Selecciona el cargo correspondiente a cada colaborador dentro de tu negocio.`}
			/>
			<div>
				{users.map((user) => (
					<User key={user.uid} user={user} onSelect={onSelect(user.email)} />
				))}
			</div>
		</div>
	)
}

export default Users
