// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// VISTAS
import Product from 'views/product'
import Head from 'components/head'

// HOOKS
import withAuth from 'components/hoc/auth'

const ProductPage: NextPage = () => {
	// ROUTER
	const router = useRouter()
	const { productID } = router.query

	return (
		<>
			<Head />
			<Product productID={productID as string} />
		</>
	)
}

export default withAuth(ProductPage)
