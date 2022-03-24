// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// HOOKS
import withAuth from 'components/hoc/auth'

// COMPONENTES
import RegistryView from 'views/registry'
import Head from 'components/head'

const Registry: NextPage = () => {
	return (
		<>
			<Head />
			<RegistryView />
		</>
	)
}

export default withAuth(Registry)
