// REACT
import React, { useCallback, useState } from 'react'

// CONTEXTO
import UserContext from 'context/user'

// UTILS
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/auth'
import { getUser } from 'utils/user'

// RUTAS
import ROUTES from 'router/routes'

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

	// HISTORY
	const router = useRouter()

	// AUTH
	useAuth(
		useCallback((authUser: firebase.default.User | null) => {
			const getUserData = async () => {
				if (authUser && authUser.email) {
					// LEER DE FIRESTORE
					getUser(authUser.email).then((user: User | null) => {
						setUser({ user, isAnonymous: authUser.isAnonymous })

						// REDIRECTION
						if (process.env.NODE_ENV === 'production') router.push(ROUTES.forms)
					})
				} else setUser({ user: null, isAnonymous: false })
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
