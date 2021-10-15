// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Products from 'views/products'
import Head from 'components/head'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const ProductsPage: NextPage = () => {
	return (
		<>
			<Head />
			<Products />
		</>
	)
}

export default withAuth(ProductsPage)
