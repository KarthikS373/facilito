// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// VIEWS
import Answers from 'views/answers'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const AnswersPage: NextPage = () => {
	// ROUTER
	const router = useRouter()
	const { formID } = router.query

	return <Answers formID={formID as string} />
}

export default withAuth(AnswersPage)
