import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	business: Business | null
	setBusiness(business: Business | null): void
	setBusinessDB(business: Partial<Business>): void
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	business: null,
	setBusiness: () => {},
	setBusinessDB: () => {},
}

// CONTEXTO
const BusinessContext: Context<ContextProps> = createContext(DefContext)

export default BusinessContext
