// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Tracking from 'views/tracking'

// ROUTER
import isProtectedRoute from 'router/tools'

// PAGE
const TrackingPage: NextPage = () => {
	return <Tracking />
}

export const getServerSideProps = isProtectedRoute
export default TrackingPage
