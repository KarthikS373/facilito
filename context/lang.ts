import { createContext, Context } from 'react'

export interface IPortrayContext {
	setLang: (langCode: string) => void
	langCode: string
	mainLang: string
	langs: string[]
}
const defContext: IPortrayContext = {
	langs: ['en', 'es'],
	setLang: () => {},
	mainLang: 'en',
	langCode: 'en',
}

// CONTEXTO
const LangContext: Context<IPortrayContext> = createContext(defContext)

export default LangContext
