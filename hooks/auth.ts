// TOOLS
import { useEffect, useState } from 'react'
import { getAuth } from 'utils/auth'

// AUTH
export const useAuth = (
	setAuth: React.Dispatch<React.SetStateAction<firebase.default.User | null>>
) => {
	useEffect(() => {
		// LEER USUARIO
		let listener: firebase.default.Unsubscribe | null = null
		const reqUser = async () => {
			const auth = await getAuth()
			listener = auth().onAuthStateChanged(setAuth)
		}

		// PETICIÓN
		reqUser()
		return () => {
			if (listener) listener()
		}
	}, [])
}
