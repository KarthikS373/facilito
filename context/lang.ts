import { createContext, Context } from 'react'

export interface IPortrayContext {
	setLang: (langCode: string) => void
	strings: PortrayDict
	langCode: string
	mainLang: string
	langs: string[]
}
const defContext: IPortrayContext = {
	langs: ['en', 'es'],
	setLang: () => {},
	mainLang: 'en',
	langCode: 'en',
	strings: {},
}

// CONTEXTO
const LangContext: Context<IPortrayContext> = createContext(defContext)

export default LangContext
