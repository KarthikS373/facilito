// TIPOS

import { IPortrayContext } from 'context/lang'

/**
 * Obtener texto
 * @description Lee o crea un nuevo valor en el json de strings
 * @param  {TemplateStringsArray} key
 * @param  {IPortrayContext} ctx
 */
// OBTENER TEXTO
const getTextFromDict = (key: TemplateStringsArray, ctx: IPortrayContext) => {
	// FORMATO DE KEY
	const trimmedKey: string = key[0].trim()

	// VERIFICAR SI EXISTE
	if (trimmedKey in ctx.strings) {
		const text: string = ctx.strings[trimmedKey][ctx.langCode]
		return text === '$' ? trimmedKey : text
	} else {
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
		return trimmedKey
	}
}

export default getTextFromDict
