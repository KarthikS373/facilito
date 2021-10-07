// TIPOS
import type { NextApiRequest, NextApiResponse } from 'next'
import authRequired from 'router/tools'

// DATOS
type RespData = { success: boolean; error?: string }

/**
 * API Logout
 * @description Eliminar cookie de session
 * @param {NextApiRequest} req
 * @param {NextApiResponse<RespData>} res
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<RespData>): Promise<void> =>
	authRequired(
		req,
		async () => {
			// PARAMS
			const { method } = req

			// METHODS
			switch (method) {
				case 'POST':
					res.setHeader(
						'Set-Cookie',
						`__session=deleted;Path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`
					)
					res.status(200).json({ success: true })
					break
				default:
					res.setHeader('Allow', ['POST'])
					res.status(405).json({ success: false, error: `Method ${method} Not Allowed` })
			}
		},
		async () => {
			res.status(401).json({ success: false, error: 'Unauthorized Request' })
		}
	)

export default handler
