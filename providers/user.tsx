// REACT
import React, { useEffect, useState, useContext } from 'react'

// CONTEXTO
import UserContext from 'context/user'

// UTILS
import { getUser } from 'utils/user'

// CONTEXTO
import AuthContext from 'context/auth'
import { useRouter } from 'next/router'
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

	// CONTEXTO
	const { user } = useContext(AuthContext)

	// HISTORY
	const router = useRouter()

	// AUTH
	useEffect(() => {
		const getUserData = async () => {
			if (user && user.email) {
				// LEER DE FIRESTORE
				getUser(user.email).then((userFrb: User | null) => {
					setUser({ user: userFrb, isAnonymous: user?.isAnonymous ?? false })
					if (!userFrb?.business || !userFrb?.business?.length) {
						router.push(ROUTES.registry)
					} else {
						if (router.asPath === ROUTES.registry) router.push(ROUTES.forms)
					}
				})
			} else setUser({ user: null, isAnonymous: user?.isAnonymous ?? false })
		}

		// PETICIÓN
		getUserData()
	}, [user])

	return (
		<UserContext.Provider value={{ ...userData, setUser }}>{props.children}</UserContext.Provider>
	)
}

export default UserProvider
