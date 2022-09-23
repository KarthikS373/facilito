// REACT
import React from 'react'

// TIPOS
import type { NextPage } from 'next'

// VISTAS
import Stock from 'views/stock'
import Head from 'components/head'

// HOOKS
// import withAuth from 'components/hoc/auth'

// PAGE
const StockPage: NextPage = () => {
	return (
		<>
			<Head />
			<Stock />
		</>
	)
}

// TODO: add auth
export default StockPage
