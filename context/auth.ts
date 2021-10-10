import { createContext, Context } from 'react'
import type { User } from '@firebase/auth'

// KEYS
interface ContextProps {
	userExists: boolean
	user: User | null | undefined
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	userExists: false,
	user: undefined,
}

// CONTEXTO
const AuthContext: Context<ContextProps> = createContext(DefContext)

export default AuthContext
