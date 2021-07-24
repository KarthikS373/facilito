import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	forms: FormInterface
	setForms: (forms: FormInterface) => unknown
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	forms: {
		answers: [],
		forms: [],
	},
	setForms: () => {},
}

// CONTEXTO
const FormsContext: Context<ContextProps> = createContext(DefContext)

export default FormsContext
