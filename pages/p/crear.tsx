// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Product from 'views/product'
import Head from 'components/head'

// HOOKS
import withAuth from 'components/hoc/auth'

const ProductPage: NextPage = () => {
	return (
		<>
			<Head />
			<Product />
		</>
	)
}

export default withAuth(ProductPage)
