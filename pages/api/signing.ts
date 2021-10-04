// TIPOS
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

// DATOS
type RespData = { success: boolean }

const handler = (req: NextApiRequest, res: NextApiResponse<RespData>): void => {
	// CREAR COOKIE
	res.setHeader(
		'Set-Cookie',
		serialize('token', req.body.token, {
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
}

export default handler
