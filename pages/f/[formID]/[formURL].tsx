// REACT
import React from 'react'

// ADMIN
import admin from 'keys/firebase-admin'

// TIPOS
import type { NextPage, GetServerSideProps } from 'next'

// VIEWS
import Form from 'views/form'

// HOC
import withAuth from 'components/hoc/auth'

// PROPIEDADES DEL SERVIDOR
interface FormPageProps {
	companyID: string | null
	formData: Form | null
	companyURL: string
	formURL: string
}

// PAGE
const FormPage: NextPage<FormPageProps> = (props) => {
	return <Form {...props} />
}

// PROPIEDADES INICIALES DE SERVIDOR
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// COOKIE Y PARAMS
	const { formURL, formID } = ctx.query

	// QUERIES
	const db = admin.firestore()
	const collection = db
		.collectionGroup('forms')
		.where('url', '==', formURL)
		.where('company.url', '==', formID)
		.limit(1)

	// DATOS
	const docs = (await collection.get()).docs
	const companyId = docs.map((doc) => doc.ref.parent.parent?.id) as string[]
	const forms = docs.map((doc) => doc.data()) as Form[]
	const response = [companyId[0], forms[0]] as [string, Form]

	// FORMULARIO
	const companyID: string | null = response[0] || null
	const formData: Form | null = response[1] || null
	formData.components = formData.components.map((component) => {
		const tmpComponent = { ...component }
		if (component.name === 'date') {
			const time = JSON.parse(JSON.stringify(component.time))
			tmpComponent.time = time
			return tmpComponent
		} else return tmpComponent
	})

	return {
		props: { formData, companyID, companyURL: formID, formURL },
	}
}

export default withAuth(FormPage, { tryAnonymous: true })
