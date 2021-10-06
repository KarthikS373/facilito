// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Login from 'views/login'

// TOOLS
import isProtectedRoute from 'router/tools'

// PAGE
const AccountPage: NextPage = () => {
	return <Login />
}

AccountPage.getInitialProps = isProtectedRoute
export default AccountPage
