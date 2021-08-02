// REACT
import React from 'react'

// TIPOS
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// VIEWS
import Answers from 'views/answers'

// PAGE
const AnswersPage: NextPage = () => {
	// ROUTER
	const router = useRouter()
	const { formID } = router.query

	return <Answers formID={formID as string} />
}

export default AnswersPage
