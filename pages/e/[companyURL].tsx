// REACT
import React from 'react'

// ADMIN
import admin from 'keys/firebase-admin'

// TIPOS
import type { NextPage, GetServerSideProps } from 'next'

// NEXT
import Head from 'next/head'

// HOC
import { useFormBackground } from 'hooks/forms'

// COMPONENTES
import withAuth from 'components/hoc/auth'
import CompanyView from 'views/company'

// TOOLS
import { getBackgroundColors } from 'utils/tools'

// PROPIEDADES DEL SERVIDOR
interface CompanyPageProps {
	company: Business | null
	companyURL: string
	forms: Form[]
}

// PAGE
const CompanyPage: NextPage<CompanyPageProps> = (props) => {
	// COLORES POR DEFECTO
	const defColors = getBackgroundColors(props.company?.background ?? '')

	// COLOR DE FONDO
	useFormBackground(
		props.company?.backgroundImage?.length
			? props.company.backgroundImage
			: props.company?.background
	)

	// TITULO
	const title = `${props.company?.name} | Facilito`

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
				<meta name='description' content={props.company?.description ?? ''} />
				<meta name='msapplication-TileColor' content={defColors[0]} />
				<meta name='theme-color' content={defColors[0]} />
				<meta property='og:type' content='website' />
				<meta property='og:title' content={title} />
				<meta property='og:site_name' content='Facilito' />
				<meta
					property='og:url'
					content={`https://https://facilito-release.web.app/e/${props.companyURL}`}
				/>
				<meta property='og:description' content={props.company?.description ?? ''} />
				{props.company?.picture && (
					<meta property='og:image' content={props.company?.picture ?? ''} />
				)}
			</Head>
			<CompanyView {...props} />
		</>
	)
}

// PROPIEDADES INICIALES DE SERVIDOR
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	ctx.res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

	// COOKIE Y PARAMS
	const { companyURL } = ctx.query

	// QUERIES
	const db = admin.firestore()
	const collection = db.collection('business').where('url', '==', companyURL).limit(1)

	// DATOS
	const docs = (await collection.get()).docs
	const company = docs[0].data() as Business | null

	// FOMRULARIOS
	let forms: Form[] = []
	if (company?.id) {
		const formsDB = db.collection('business').doc(company?.id).collection('forms').get()
		forms = ((await formsDB).docs.map((doc) => doc.data()).filter(Boolean) as Form[]).filter(
			(form) => form.public
		)
	} else forms = []

	return {
		props: { company, companyURL, forms: JSON.parse(JSON.stringify(forms)) },
	}
}

export default withAuth(CompanyPage, { tryAnonymous: true })
