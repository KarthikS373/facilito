// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Products from 'views/products'

// ROUTER
import isProtectedRoute from 'router/tools'

// PAGE
const ProductsPage: NextPage = () => {
	return <Products />
}

export const getServerSideProps = isProtectedRoute
export default ProductsPage
