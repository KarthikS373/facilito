// REACT
import React from 'react'

// ADMIN
import admin from 'keys/firebase-admin'

// TIPOS
import type { NextPage, GetServerSideProps } from 'next'

// NEXT
import Head from 'next/head'

// VIEWS
import Form from 'views/form'

// HOC
import { useFormBackground } from 'hooks/forms'

// COMPONENTES
import withAuth from 'components/hoc/auth'

// TOOLS
import { getBackgroundColors } from 'utils/tools'

// PROPIEDADES DEL SERVIDOR
interface FormPageProps {
	company: Business | null
	formData: Form | null
	companyURL: string
	formURL: string
}

// PAGE
const FormPage: NextPage<FormPageProps> = (props) => {
	// COLORES POR DEFECTO
	const defColors = getBackgroundColors(props.formData?.background ?? '')

	// COLOR DE FONDO
	useFormBackground(props.formData?.background)

	// TITULO
	const title = `📝${props.formData?.title || ''} - ${props.company?.name || ''} | Facilito`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					key='viewport'
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
				/>
				<meta name='application-name' content={title} />
				<meta name='apple-mobile-web-app-title' content={title} />
				<meta name='description' content={props.formData?.description || ''} />
				<meta name='msapplication-TileColor' content={defColors[0]} />
				<meta name='theme-color' content={defColors[0]} />
				<meta property='og:type' content='website' />
				<meta property='og:title' content={title} />
				<meta property='og:site_name' content='Facilito' />
				<meta
					property='og:url'
					content={`https://https://facilito-release.web.app/f/${props.companyURL}/${props.formURL}`}
				/>
				<meta property='og:description' content={props.formData?.description || ''} />
				{props.formData?.banner && <meta property='og:image' content={props.formData?.banner} />}
			</Head>
			<Form {...props} />
		</>
	)
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

	// TIENDA
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

	// EMPRESA
	let company: Business | null = null
	if (companyID) {
		const businessCol = db.collection('business')
		const businessDoc = businessCol.doc(companyID)
		company = (await businessDoc.get()).data() as Business
	}

	return {
		props: { formData, company, companyURL: formID, formURL },
	}
}

export default withAuth(FormPage, { tryAnonymous: true })
