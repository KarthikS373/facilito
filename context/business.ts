import { createContext, Context } from 'react'

// KEYS
export interface BusinessContextProps {
	business: Business | null
	setBusiness: React.Dispatch<React.SetStateAction<Business | null>>
	setBusinessDB(business: Partial<Business>, onSuccess?: EmptyFunction): void
}

// VALOR POR DEFECTO
const DefContext: BusinessContextProps = {
	business: null,
	setBusiness: () => null,
	setBusinessDB: () => null,
}

// CONTEXTO
const BusinessContext: Context<BusinessContextProps> = createContext(DefContext)

export default BusinessContext
