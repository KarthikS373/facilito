import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	user: User | null
	setUser(props: { user: User | null; isAnonymous: boolean }): void
	isAnonymous: boolean
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	user: null,
	setUser: () => {},
	isAnonymous: false,
}

// CONTEXTO
const UserContext: Context<ContextProps> = createContext(DefContext)

export default UserContext
