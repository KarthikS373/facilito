// REACT
import React from 'react'

// NEXT
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// COMPONENTES
import Head from 'components/head'

// VIEWS
import dynamic from 'next/dynamic'
const NewFormView = dynamic(() => import('views/editForm'), { ssr: false })

const EditForm: NextPage = () => {
	// ROUTER
	const router = useRouter()
	const { formID, title } = router.query

	return (
		<>
			<Head />
			<NewFormView id={(formID as string) ?? ''} formTitle={(title as string) ?? ''} />
		</>
	)
}

export default EditForm
