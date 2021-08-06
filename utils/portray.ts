// TIPOS
import { IPortrayContext } from 'context/lang'

// UTILS
import { normalizeString } from './tools'
import LZString from 'lz-string'

interface ProviderProps extends Omit<IPortrayContext, '$' | 'setLang'> {
	strings: PortrayDict
}
/**
 * Obtener texto
 * @description Lee o crea un nuevo valor en el json de strings
 * @param  {TemplateStringsArray} key
 * @param  {ProviderProps} ctx
 */
const getTextFromDict = (key: TemplateStringsArray, values: any[], ctx: ProviderProps) => {
	// FORMATO DE KEY
	const joined: string = [key[0], ...values].join('')
	const normalizedKey: string = normalizeString(joined)
	const trimmedKey: string = LZString.compressToBase64(normalizedKey)

	// VERIFICAR SI EXISTE
	if (trimmedKey in ctx.strings) {
		const text: string = ctx.strings[trimmedKey][ctx.langCode]
		return text === '$' ? joined : text
	} else {
		if (process.env.NODE_ENV === 'development') {
			// CREAR
			const stringsDict = {
				[normalizedKey]: Object.fromEntries(
					ctx.langs.map((langCode: string) => [langCode, langCode === ctx.mainLang ? '$' : ''])
				),
			}

			// GUARDAR
			fetch('http://127.0.0.1:4000/write', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					stringsDict,
				}),
			})

			// RETORNAR
			return joined
		} else return joined
	}
}

export default getTextFromDict
