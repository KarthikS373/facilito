import { useContext } from 'react'

// CONTEXTOS
import LangContext from 'context/lang'

// STRINGS
/**
 * Hook de strings
 * @description Contexto de diccionario de strings
 */
export const useStrings = () => {
	const { lang } = useContext(LangContext)
	return lang
}
