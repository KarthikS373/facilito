import defBusiness from 'views/settings/utils/initials'
import type { ParsedUrlQuery } from 'querystring'

/** Validar creacion
 * @param  {boolean} isNewCompany
 * @param  {Business} businessData
 * @param  {Business|null} selectedBusiness
 */
export const validateContinue = (
	isNewCompany: boolean,
	businessData: Business,
	selectedBusiness: Business | null
) => {
	if (isNewCompany) {
		if (
			businessData.name.length > 0 &&
			businessData.url.length > 0 &&
			businessData.category.length > 0 &&
			businessData.phone.length > 0
		)
			return false
		else return true
	} else {
		if (selectedBusiness) return false
		else return true
	}
}

/**
 * Obtener negocio por defecto
 * @param  {ParsedUrlQuery} query
 * @returns {Business}
 */
export const getDefBusiness = (query: ParsedUrlQuery): Business => ({
	...defBusiness,
	subscription: {
		plan: `Plan ${query['p'] === '0' ? 'Básico' : 'Pro'}`,
		price: query['p'] === '0' ? '99' : '199',
		duration: 30,
	},
})
