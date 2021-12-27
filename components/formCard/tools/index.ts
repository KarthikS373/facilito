/**
 * Borrar tienda si es un admin
 * @param onDelete
 * @param role
 */
const handleDelete = (onDelete?: EmptyFunction, role?: User['role']): void => {
	if (onDelete) {
		if (role === 'admin') onDelete()
		else
			window.Alert({
				title: 'Ocurrió un error',
				body: 'Actualmente no tienes los permisos necesarios para acceder a esta funcionalidad.',
				type: 'error',
			})
	}
}

export default handleDelete
