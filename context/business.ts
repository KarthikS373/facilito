import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	badge: string
	business: Business | null
	setBadge(badge: string): void
	setBusiness(business: Business | null): void
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	badge: '',
	business: null,
	setBadge: () => {},
	setBusiness: () => {},
}

// CONTEXTO
const BusinessContext: Context<ContextProps> = createContext(DefContext)

export default BusinessContext
