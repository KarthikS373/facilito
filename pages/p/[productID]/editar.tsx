// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// VISTAS
import Product from 'views/product'

const ProductPage: NextPage = () => {
	// ROUTER
	const router = useRouter()
	const { productID } = router.query

	return <Product productID={productID as string} />
}

export default ProductPage