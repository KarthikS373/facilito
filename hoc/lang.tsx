// CONTEXTO
import { useContext } from 'react'
import LangContext from 'context/lang'

// STRINGS
import Strings from 'lang/strings.json'

// UTILS
import getTextFromDict from 'utils/portray'

// HOC DE PORTRAY
const withStrings = <T,>(Component: Portray.FC<T>) => {
	const WithStringsComponent: React.FC<T> = (props) => {
		// CONTEXTO
		const langCtx = useContext(LangContext)

		// LEER STRINGS
		function $(key: TemplateStringsArray) {
			return getTextFromDict(key, {
				langCode: langCtx.langCode,
				mainLang: langCtx.mainLang,
				// @ts-ignore
				strings: Strings,
				langs: langCtx.langs,
			})
		}

		// RENDER
		return <Component {...props} $={$} langCode={langCtx.langCode} setLangCode={langCtx.setLang} />
	}

	return WithStringsComponent
}

export default withStrings
