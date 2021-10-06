// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Forms from 'views/forms'

// ROUTER
import isProtectedRoute from 'router/tools'

// PAGE
const FormsPage: NextPage = () => {
	return <Forms />
}

FormsPage.getInitialProps = isProtectedRoute
export default FormsPage
