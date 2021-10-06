// REACT
import React, { useEffect, useState, useContext } from 'react'

// CONTEXTO
import UserContext from 'context/user'

// UTILS
import { useRouter } from 'next/router'
import { getUser } from 'utils/user'

// RUTAS
import ROUTES from 'router/routes'

// CONTEXTO
import AuthContext from 'context/auth'

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

	// CONTEXTO
	const { user } = useContext(AuthContext)

	// HISTORY
	const router = useRouter()
	const path: string = router.asPath

	// AUTH
	useEffect(() => {
		const getUserData = async () => {
			if (user && user.email) {
				// LEER DE FIRESTORE
				getUser(user.email).then((userFrb: User | null) => {
					setUser({ user: userFrb, isAnonymous: user?.isAnonymous || false })
				})

				// REDIRECTION
				if (path === ROUTES.login) router.push(ROUTES.forms)
			} else setUser({ user: null, isAnonymous: user?.isAnonymous || false })
		}

		// PETICIÓN
		getUserData()
	}, [path, router, user])

	return (
		<UserContext.Provider value={{ ...userData, setUser }}>{props.children}</UserContext.Provider>
	)
}

export default UserProvider
