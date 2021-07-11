// DEPS
import { getCollection } from 'utils/db'

/**
 * Obtener usuario
 * @param  {string} email
 * @description Devuelve un usuario de firestore con correo o null si no se encuentra.
 */
export const getUser = async (email: string): Promise<User | null> => {
	if (email) {
		// DOC
		const userCol = await getCollection('users')
		const userDoc = userCol.doc(email)

		// USUARIO
		const user = (await userDoc.get()).data() as User
		return user
	} else return null
}
