// CONTEXTO
import { useContext } from 'react'
import LangContext from 'context/lang'

// STRINGS
import Strings from 'lang/strings.json'

// UTILS
import getTextFromDict from 'utils/portray'

// PROPS
interface UseStringsProps {
	$: TemplateStrBuilder
	langCode: string
	setLangCode: (langCode: string) => void
}

/**
 * Hook de Strings
 * @description Retorna la informacion sobre el lenguaje
 */
const useStrings = (): UseStringsProps => {
	const langCtx = useContext(LangContext)

	// LEER STRINGS
	function $(key: TemplateStringsArray, ...values: unknown[]) {
		return getTextFromDict(key, values, {
			langCode: langCtx.langCode,
			mainLang: langCtx.mainLang,
			strings: Strings,
			langs: langCtx.langs,
		})
	}

	// RETORNAR
	const data: UseStringsProps = {
		$,
		langCode: langCtx.langCode,
		setLangCode: langCtx.setLang,
	}

	return data
}

export default useStrings
