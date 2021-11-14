// REACT
import React from 'react'

// NEXT
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// VIEWS
import NewFormView from 'views/editForm'

const EditForm: NextPage = () => {
	// ROUTER
	const router = useRouter()
	const { formID } = router.query

	return <NewFormView id={(formID as string) ?? ''} />
}

export default EditForm
