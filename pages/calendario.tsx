// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Calendar from 'views/calendar'
import Head from 'components/head'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const CalendarPage: NextPage = () => {
	return (
		<>
			<Head />
			<Calendar />
		</>
	)
}

export default withAuth(CalendarPage)
