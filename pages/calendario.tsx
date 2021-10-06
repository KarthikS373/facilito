// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Calendar from 'views/calendar'

// ROUTER
import isProtectedRoute from 'router/tools'

// PAGE
const CalendarPage: NextPage = () => {
	return <Calendar />
}

CalendarPage.getInitialProps = isProtectedRoute
export default CalendarPage
