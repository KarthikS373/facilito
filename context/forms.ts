import { createContext, Context } from 'react'

// KEYS
export interface FormsContextProps {
	forms: FormInterface
	setForms: SetState<FormInterface>
	setFormsDB: (forms: Partial<FormInterface>) => unknown
}

// VALOR POR DEFECTO
const DefContext: FormsContextProps = {
	forms: {
		answers: [],
		forms: [],
	},
	setForms: () => null,
	setFormsDB: () => null,
}

// CONTEXTO
const FormsContext: Context<FormsContextProps> = createContext(DefContext)

export default FormsContext
