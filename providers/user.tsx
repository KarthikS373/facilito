// REACT
import React, { useCallback, useState } from 'react'

// TIPOS
import type { User as UserFrb } from '@firebase/auth'

// CONTEXTO
import UserContext from 'context/user'

// UTILS
import { useAuth } from 'hooks/auth'
import { getUser } from 'utils/user'

// ESTADO
interface ProviderState {
	user: User | null | undefined
	isAnonymous: boolean
}

// DATOS INICIALES
const defState: ProviderState = {
	user: undefined,
	isAnonymous: false,
}

const UserProvider: React.FC = (props) => {
	// ESTADO
	const [userData, setUser] = useState<ProviderState>({ ...defState })

	// AUTH
	useAuth(
		useCallback((authUser: UserFrb | null) => {
			const getUserData = async () => {
				if (authUser && authUser.email) {
					// LEER DE FIRESTORE
					getUser(authUser.email).then((user: User | null) => {
						setUser({ user, isAnonymous: authUser.isAnonymous })
					})
				} else setUser({ user: null, isAnonymous: authUser?.isAnonymous || false })
			}

			// PETICIÓN
			getUserData()
		}, [])
	)

	return (
		<UserContext.Provider value={{ ...userData, setUser }}>{props.children}</UserContext.Provider>
	)
}

export default UserProvider
