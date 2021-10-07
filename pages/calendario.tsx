// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Calendar from 'views/calendar'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const CalendarPage: NextPage = () => {
	return <Calendar />
}

export default withAuth(CalendarPage)
