// TOOLS
import { Unsubscribe, User, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { getAuth } from 'utils/auth'

/**
 * Hook de Auth
 * @param  {React.Dispatch<React.SetStateAction<firebase.default.User|null>>} setAuth
 * @description Crea un listener para el objeto Auth de firebase
 */
export const useAuth = (setAuth: React.Dispatch<React.SetStateAction<User | null>>) => {
	useEffect(() => {
		// LEER USUARIO
		let listener: Unsubscribe | null = null
		const reqUser = async () => {
			const auth = await getAuth()
			listener = onAuthStateChanged(auth, setAuth)
		}

		// PETICIÓN
		reqUser()
		return () => {
			if (listener) listener()
		}
	}, [])
}
