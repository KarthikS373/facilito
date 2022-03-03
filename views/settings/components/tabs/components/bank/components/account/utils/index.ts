/**
 * Obtener tipo de cuenta bancaria
 * @param  {TemplateStrBuilder} $
 * @returns {string}
 */

const getBankAccountType = ($: TemplateStrBuilder): string[] => [
	$`Monetaria`,
	$`Ahorro`,
	$`Empresarial`,
]
export default getBankAccountType
