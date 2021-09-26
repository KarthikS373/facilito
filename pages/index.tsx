// REACT
import React, { useEffect } from 'react'

// NEXT
import { useRouter } from 'next/router'

// RUTAS
import ROUTES from 'router/routes'

const Index: React.FC = () => {
	// ROUTER
	const router = useRouter()

	useEffect(() => {
		router.push(process.env.NODE_ENV == 'development' ? ROUTES.forms : ROUTES.login)
	}, [])

	return <></>
}

export default Index
