/**
 * Remover tildes
 * @ Retornar un string sin tildes
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
 * @param  {string} url
 */
export const normalizeString = (str: string) => {
	return slugify(str)
		.replace(/[^\w\s]/gi, '')
		.replace(/ /g, '_')
		.trim()
		.toLowerCase()
}
