// TIPOS
import type { NextPageContext } from 'next'
import { parse } from 'cookie'

// ROUTER
import Router from 'next/router'

// FIREBASE Y NOOKIES
import { firebaseAdmin } from 'keys/firebase-admin'

const isProtectedRoute = async (ctx: NextPageContext): Promise<never> => {
	// COOKIE
	const path: string = ctx.pathname
	const sessionCookie = parse((ctx.req?.headers?.cookies as string) || '')?.session || ''

	// VERIFICAR TOKEN
	let idToken: firebaseAdmin.auth.DecodedIdToken | null = null
	if (sessionCookie?.length)
		idToken = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true)

	// REDIRECT
	if (idToken) {
		if (path === '/cuenta') {
			if (ctx.res) {
				ctx.res.writeHead(307, { Location: '/formularios' })
				ctx.res.end()
			} else Router.replace('/formularios')
		}
	} else {
		if (path !== '/cuenta') {
			if (ctx.res) {
				ctx.res.writeHead(307, { Location: '/cuenta' })
				ctx.res.end()
			} else Router.replace('/cuenta')
		}
	}

	return {} as never
}

export default isProtectedRoute
