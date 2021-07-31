// FUNCTIONS
import getCallable from './functions'

/**
 * Remover tildes
 * @description Retornar un string sin tildes
 * @param  {string} str
 */
const slugify = (str: string) => {
	const map = {
		'-': '_',
		a: 'á|à|ã|â|ä|À|Á|Ã|Â|Ä',
		e: 'é|è|ê|ë|É|È|Ê|Ë',
		i: 'í|ì|î|ï|Í|Ì|Î|Ï',
		o: 'ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö',
		u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
		c: 'ç|Ç',
		n: 'ñ|Ñ',
	}

	for (var pattern in map) str = str.replace(new RegExp(map[pattern], 'g'), pattern)
	return str
}
/**
 * Normalizar string
 * @description Convierte un string en su cadena mas optima
 * @param  {string} str
 */
export const normalizeString = (str: string) => {
	return slugify(str)
		.trim()
		.replace(/[^\w\s]/gi, '')
		.replace(/ /g, '_')
		.toLowerCase()
}

/**
 * Parser de date
 * @description Convierte un objeto TimeStamp o Date en Date
 * @param  {unknown} date
 */
export const parseDate = (date: unknown): Date => {
	if (date && typeof date === 'object') {
		// @ts-ignore
		if ('toDate' in date) return date.toDate()
		else return date as Date
	}
}

/**
 * Fecha a string
 * @description Convierte una fecha a un string Fecha, Hora
 * @param  {Date} date
 */
export const dateToString = (date: Date) => {
	return `${parseDate(date).toLocaleDateString('en-GB')}, ${parseDate(date).toLocaleTimeString(
		'en-US'
	)}`
}

/**
 * Fecha a string de hora
 * @description Convierte una fecha a un string hora
 * @param  {Date} date
 */
export const hourToString = (date: Date | null | string | number) => {
	if (date && typeof date !== 'string' && typeof date !== 'number') {
		return parseDate(date).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
		})
	} else return ''
}

/**
 * Enviar correo
 * @description Llama a la api sendEmail
 * @param  {string} html
 * @param  {string} subject
 * @param  {string | string[]} email
 */
export const sendMail = async (html: string, subject: string, email?: string | string[]) => {
	// QUERY STRING
	const sendEmail = await getCallable('sendEmail')

	// ENVIAR CORREO
	return await sendEmail({
		email,
		subject,
		content: html,
	})
}

/**
 * Imprimir html
 * @description Imprime una ventana con text/html
 * @param  {string} html
 */
export const printHTML = (html: string) => {
	// VENTANA
	let customWindow = window.open('', 'PRINT')

	// ESCRIBIR
	customWindow?.document.write(html)

	// CERRAR
	customWindow?.document.close()
	customWindow?.focus()

	// IMPRIMIR
	customWindow?.print()
	customWindow?.close()
}
