// TIPOS
import { firebaseAdmin } from 'keys/firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

// DATOS
type RespData = { success: boolean; error?: string }

const handler = async (req: NextApiRequest, res: NextApiResponse<RespData>): Promise<void> => {
	// PARAMS
	const { method } = req
	const expiresIn = 60 * 60 * 24 * 5 * 1000

	switch (method) {
		case 'POST':
			// eslint-disable-next-line no-case-declarations
			const { token } = req.headers

			if (token) {
				await firebaseAdmin
					.auth()
					.createSessionCookie(token as string, { expiresIn })
					.then(
						(sessionCookie) => {
							res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie')
							res.setHeader(
								'Set-Cookie',
								`session=${sessionCookie};Path=/;HttpOnly;Max-Age=${expiresIn};`
							)
							res.status(200).json({ success: true })
						},
						(error) =>
							res.status(401).json({ success: false, error: 'Unauthorized Request ' + error })
					)
			} else res.status(400).json({ success: false, error: 'Invalid input' })

			break
		default:
			res.setHeader('Allow', ['POST'])
			res.status(405).json({ success: false, error: `Method ${method} Not Allowed` })
	}
}

export default handler
