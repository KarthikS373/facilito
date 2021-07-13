// CONTEXTO
import { useContext } from 'react'
import LangContext from 'context/lang'

// STRINGS
import Strings from 'lang/strings.json'

// UTILS
import getTextFromDict from 'utils/portray'

// HOC DE PORTRAY
const withStrings = <T,>(Component: Portray.FC<T>) => {
	const WithStringsComponent = (props: T) => {
		// CONTEXTO
		const langCtx = useContext(LangContext)

		// LEER STRINGS
		function $(key: TemplateStringsArray) {
			return getTextFromDict(key, {
				langCode: langCtx.langCode,
				mainLang: langCtx.mainLang,
				strings: Strings,
				langs: langCtx.langs,
			})
		}

		// RENDER
		return <Component {...props} $={$} />
	}

	return WithStringsComponent
}

export default withStrings
