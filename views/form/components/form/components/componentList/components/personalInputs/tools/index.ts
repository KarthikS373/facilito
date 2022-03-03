/**
 * Obtener inputs personales
 * @param  {FormPersonalData} personalData
 */
const getPersonalStrings: (personalData: FormPersonalData) => [boolean[], string[]] = (
	personalData: FormPersonalData
) => {
	const personalOptionsList = [
		personalData.phone,
		personalData.email,
		personalData.address,
		personalData.instructions,
	]
	const personalOptionsStr = [
		'personal_phone_0',
		'personal_email_0',
		'personal_address_0',
		'personal_instructions_0',
	]
	return [personalOptionsList, personalOptionsStr]
}

interface LabelsAndHelpers {
	labels: string[]
	helpers: string[]
}

/**
 * Obtener labels
 * @param  {TemplateStrBuilder} $
 * @returns {LabelsAndHelpers}
 */
export const getLabelsAndHelpers = ($: TemplateStrBuilder): LabelsAndHelpers => {
	// TEXTOS
	const labels = [$`Correo electrónico`, $`Dirección`, $`Observaciones`]
	const helpers = [
		$`Verifica que tenga un formato correcto`,
		$`La dirección debe incluir el país`,
		$`Indica instrucciones, y opiniones`,
	]

	return { labels, helpers }
}

export default getPersonalStrings
