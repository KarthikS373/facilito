// REACT Y NOOKIES
import React, { useState, useEffect } from 'react'
import nookies from 'nookies'

// TIPOS
import type { User, Unsubscribe } from '@firebase/auth'

// CONTEXT
import AuthContext from 'context/auth'
import { getAuth } from 'utils/auth'

const AuthProvider: React.FC = ({ children }) => {
	// ESTADO DE CONTEXTO
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		if (window) window.nookies = nookies
		let listener: Unsubscribe | undefined

		const requestChange = async () => {
			// FIREBASE
			const { onIdTokenChanged } = await import('firebase/auth')
			const auth = await getAuth()

			// CAMBIOS EN TOKEN
			listener = onIdTokenChanged(auth, async (user) => {
				// SALIR
				if (!user) {
					setUser(null)
					nookies.destroy(null, 'token')
					nookies.set(null, 'token', '', { path: '/' })
					return
				}

				// ACTUALIZAR TOKEN
				const token = await user.getIdToken()
				setUser(user)
				nookies.destroy(null, 'token')
				nookies.set(null, 'token', token, { path: '/' })
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
