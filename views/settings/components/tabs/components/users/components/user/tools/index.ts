/**
 * Obtener roles de usuario
 * @param $
 * @returns
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
