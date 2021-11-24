import React from 'react'

// NEXT
import { NextPage } from 'next'

// VISTAS
import SettingsView from 'views/settings'
import Head from 'components/head'

const SettingsPage: NextPage = () => {
	return (
		<>
			<Head />
			<SettingsView />
		</>
	)
}

export default SettingsPage
