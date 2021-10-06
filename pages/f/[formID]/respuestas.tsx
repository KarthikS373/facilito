// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// VIEWS
import Answers from 'views/answers'

// ROUTER
import isProtectedRoute from 'router/tools'

// PAGE
const AnswersPage: NextPage = () => {
	// ROUTER
	const router = useRouter()
	const { formID } = router.query

	return <Answers formID={formID as string} />
}

AnswersPage.getInitialProps = isProtectedRoute
export default AnswersPage
