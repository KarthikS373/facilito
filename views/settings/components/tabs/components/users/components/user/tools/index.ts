/**
 * Obtener roles de usuario
 * @param {TemplateStrBuilder} $
 * @returns {{ name: string; text: string }[]}
 */
const getUserRoles = ($: TemplateStrBuilder): { name: string; text: string }[] => [
	{
		name: 'admin',
		text: $`Administrador`,
	},

	{
		name: 'editor',
		text: 'Editor',
	},
]

export default getUserRoles
