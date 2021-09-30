import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	user: User | null | undefined
	setUser(props: { user: User | null; isAnonymous: boolean }): void
	isAnonymous: boolean
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	user: undefined,
	setUser: () => null,
	isAnonymous: false,
}

// CONTEXTO
const UserContext: Context<ContextProps> = createContext(DefContext)

export default UserContext
