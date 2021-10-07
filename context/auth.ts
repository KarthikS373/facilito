import { createContext, Context } from 'react'
import type { User } from '@firebase/auth'

// KEYS
interface ContextProps {
	user: User | null | undefined
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	user: null,
}

// CONTEXTO
const AuthContext: Context<ContextProps> = createContext(DefContext)

export default AuthContext
