import React from 'react'

// NEXT
import { NextPage } from 'next'

// VISTAS
import SettingsView from 'views/settings'
import Head from 'components/head'

// HOOKS
import withAuth from 'components/hoc/auth'

const SettingsPage: NextPage = () => {
	return (
		<>
			<Head />
			<SettingsView />
		</>
	)
}

export default withAuth(SettingsPage)
