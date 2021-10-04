// TOOLS
import type { User } from '@firebase/auth'
import AuthContext from 'context/auth'

// REACT
import { useContext, useEffect } from 'react'

/**
 * Hook de Auth
 * @param  {React.Dispatch<React.SetStateAction<firebase.default.User|null>>} setAuth
 * @description Crea un listener para el objeto Auth de firebase
 */
export const useAuth = (
	setAuth: React.Dispatch<React.SetStateAction<User | null>> | ((user: User | null) => void)
): void => {
	// CONTEXTO
	const { user } = useContext(AuthContext)

	// ACTUALIZAR NUEVO ESTADO
	useEffect(() => {
		setAuth(user)
	}, [user, setAuth])
}
