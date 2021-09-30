import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	forms: FormInterface
	setForms: React.Dispatch<React.SetStateAction<FormInterface>>
	setFormsDB: (forms: Partial<FormInterface>) => unknown
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	forms: {
		answers: [],
		forms: [],
	},
	setForms: () => null,
	setFormsDB: () => null,
}

// CONTEXTO
const FormsContext: Context<ContextProps> = createContext(DefContext)

export default FormsContext
