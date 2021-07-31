// TIPOS
import { IPortrayContext } from 'context/lang'

// UTILS
import { normalizeString } from './tools'
import LZString from 'lz-string'

/**
 * Obtener texto
 * @description Lee o crea un nuevo valor en el json de strings
 * @param  {TemplateStringsArray} key
 * @param  {ProviderProps} ctx
 */
// OBTENER TEXTO
interface ProviderProps extends Omit<IPortrayContext, '$' | 'setLang'> {
	strings: PortrayDict
}
const getTextFromDict = (key: TemplateStringsArray, ctx: ProviderProps) => {
	// FORMATO DE KEY
	const trimmedKey: string = LZString.compressToBase64(normalizeString(key[0]))

	// VERIFICAR SI EXISTE
	if (trimmedKey in ctx.strings) {
		const text: string = ctx.strings[trimmedKey][ctx.langCode]
		return text === '$' ? key[0] : text
	} else {
		if (process.env.NODE_ENV === 'development') {
			// CREAR
			const tmpStrings: PortrayDict = { ...ctx.strings }
			tmpStrings[trimmedKey] = Object.fromEntries(
				ctx.langs.map((langCode: string) => [langCode, langCode === ctx.mainLang ? '$' : ''])
			)

			// GUARDAR
			fetch('http://127.0.0.1:4000/write', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					stringsDict: tmpStrings,
				}),
			})

			// RETORNAR
			return key[0]
		} else return key[0]
	}
}

export default getTextFromDict
