// TIPOS
import { serialize } from 'cookie'
import { firebaseAdmin } from 'keys/firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

// DATOS
type RespData = { success: boolean; error?: string }

const handler = (req: NextApiRequest, res: NextApiResponse<RespData>): void => {
	const idToken = req.body.token.toString()
	const expiresIn = 60 * 60 * 24 * 5 * 1000

	firebaseAdmin
		.auth()
		.createSessionCookie(idToken, { expiresIn })
		.then(
			(sessionCookie) => {
				// CREAR COOKIE
				res.setHeader(
					'Set-Cookie',
					serialize('token', sessionCookie, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: 60 * 60,
						sameSite: 'strict',
						path: '/',
					})
				)
				// ENVIAR RESPUESTA
				res.statusCode = 200
				res.json({ success: true })
			},
			(error) => {
				res.status(401).send(error)
			}
		)
}

export default handler
