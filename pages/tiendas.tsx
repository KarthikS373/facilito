// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Head from 'components/head'
import Forms from 'views/forms'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const FormsPage: NextPage = () => {
	return (
		<>
			<Head />
			<Forms />
		</>
	)
}

export default withAuth(FormsPage)
