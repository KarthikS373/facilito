// DEPS
import { getCollection } from 'utils/db'

/**
 * Obtener usuario
 * @param  {string} email
 * @description Devuelve un usuario de firestore con correo o null si no se encuentra.
 */
export const getUser = async (email: string): Promise<User | null> => {
	if (email) {
		const { doc, getDoc } = await import('firebase/firestore')

		// DOC
		const userCol = await getCollection('users')
		const userDoc = doc(userCol, email)

		// USUARIO
		const user = (await getDoc(userDoc)).data() as User
		return user
	} else return null
}
