// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Products from 'views/products'

// HOOKS
import withAuth from 'components/hoc/auth'

// PAGE
const ProductsPage: NextPage = () => {
	return <Products />
}

export default withAuth(ProductsPage)
