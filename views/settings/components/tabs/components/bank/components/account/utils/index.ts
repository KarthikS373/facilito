/**
 * Obtener tipo de cuenta bancaria
 * @param $
 * @returns
 */
const getBankAccountType = ($: TemplateStrBuilder): string[] => [
	$`Monetaria`,
	$`Ahorro`,
	$`Empresarial`,
]
export default getBankAccountType
