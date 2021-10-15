// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Head from 'components/head'
import Login from 'views/login'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const AccountPage: NextPage = () => {
	return (
		<>
			<Head />
			<Login />
		</>
	)
}

export default withAuth(AccountPage)
