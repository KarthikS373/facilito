// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Customers from 'views/customers'
import Head from 'components/head'

// HOOKS
// import withAuth from 'components/hoc/auth'

// PAGE
const StockPage: NextPage = () => {
	return (
		<>
			<Head />
			<Customers />
		</>
	)
}

// TODO: add auth
export default StockPage
