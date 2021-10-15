// REACT
import React, { useEffect } from 'react'

// NEXT
import { useRouter } from 'next/router'

// VISTAS
import Head from 'components/head'

// RUTAS
import ROUTES from 'router/routes'

const Index: React.FC = () => {
	// ROUTER
	const router = useRouter()

	useEffect(() => {
		router.push(process.env.NODE_ENV === 'development' ? ROUTES.forms : ROUTES.login)
	}, [])

	return (
		<>
			<Head />
		</>
	)
}

export default Index
