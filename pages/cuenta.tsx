// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Login from 'views/login'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const AccountPage: NextPage = () => {
	return <Login />
}

export default withAuth(AccountPage)
