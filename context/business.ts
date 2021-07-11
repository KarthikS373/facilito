import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	business: Business | null
	setBusiness(business: Business | null): void
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	business: null,
	setBusiness: () => {},
}

// CONTEXTO
const BusinessContext: Context<ContextProps> = createContext(DefContext)

export default BusinessContext
