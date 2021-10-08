// REACT
import React, { useState, useEffect } from 'react'

// TIPOS
import type { User, Unsubscribe } from '@firebase/auth'

// CONTEXT
import AuthContext from 'context/auth'
import { getAuth } from 'utils/auth'

const AuthProvider: React.FC = ({ children }) => {
	// ESTADO DE CONTEXTO
	const [user, setUser] = useState<User | null | undefined>()

	useEffect(() => {
		let listener: Unsubscribe | undefined

		const requestChange = async () => {
			// FIREBASE
			const { onIdTokenChanged } = await import('firebase/auth')
			const auth = await getAuth()

			// CAMBIOS EN TOKEN
			listener = onIdTokenChanged(auth, async (user) => {
				// ACTUALIZAR TOKEN
				setUser(user || null)
				if (user) {
					const token = await user.getIdToken()
					const remember: boolean = window.localStorage.getItem('remember') === '1'
					fetch('/api/signing', {
						method: 'POST',
						headers: { token },
						body: JSON.stringify({ remember }),
					})
				}
			})
		}

		requestChange()
		return () => {
			if (listener) listener()
		}
	}, [])

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export default AuthProvider