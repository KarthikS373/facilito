// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Tracking from 'views/tracking'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const TrackingPage: NextPage = () => {
	return <Tracking />
}

export default withAuth(TrackingPage)
