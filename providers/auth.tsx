// REACT Y NOOKIES
import React, { useState, useEffect } from 'react'

// TIPOS
import type { User, Unsubscribe } from '@firebase/auth'

// CONTEXT
import AuthContext from 'context/auth'
import { getAuth } from 'utils/auth'

const AuthProvider: React.FC = ({ children }) => {
	// ESTADO DE CONTEXTO
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		let listener: Unsubscribe | undefined

		const requestChange = async () => {
			// FIREBASE
			const { onIdTokenChanged } = await import('firebase/auth')
			const auth = await getAuth()

			// CAMBIOS EN TOKEN
			listener = onIdTokenChanged(auth, async (user) => {
				// SALIR
				if (!user) return

				// ACTUALIZAR TOKEN
				setUser(user || null)
				const token = await user.getIdToken()
				fetch('/api/signing', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				})
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
