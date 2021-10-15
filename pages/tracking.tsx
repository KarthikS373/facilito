// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Tracking from 'views/tracking'
import Head from 'components/head'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const TrackingPage: NextPage = () => {
	return (
		<>
			<Head />
			<Tracking />
		</>
	)
}

export default withAuth(TrackingPage)
