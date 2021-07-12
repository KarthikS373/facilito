import { createContext, Context } from 'react'

// STRINGS
import Strings from 'lang/strings.json'

// INTERFACE
import { En } from 'env/strings'

// KEYS
interface ContextProps {
	lang: En
	langCode: string
	setLangCode: (langCode: 'es' | 'en') => unknown
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	lang: Strings.es,
	langCode: 'es',
	setLangCode: () => {},
}

// CONTEXTO
const LangContext: Context<ContextProps> = createContext(DefContext)

export default LangContext
