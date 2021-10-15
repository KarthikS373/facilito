// REACT
import React from 'react'
// TIPOS
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// VISTA
import EditTracking from 'views/editTracking'
import Head from 'components/head'

// HOOKS
import withAuth from 'components/hoc/auth'

const EditPage: NextPage = () => {
	// ROUTER
	const router = useRouter()
	const { formID } = router.query

	return (
		<>
			<Head />
			<EditTracking formID={formID as string} />
		</>
	)
}

export default withAuth(EditPage)
