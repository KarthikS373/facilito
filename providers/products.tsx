// REACT
import React, { useContext, useState } from 'react'

// CONTEXT
import BusinessContext from 'context/business'
import ProductsContext from 'context/products'

// HOOKS
import useProducts from 'hooks/products'

// UTILS
import { replaceBusiness } from 'utils/business'
import { replaceProducts } from 'utils/products'

const ProductsProvider: React.FC = (props) => {
	// ESTADO
	const [products, setLocalProducts] = useState<{ [id: string]: Product }>({})

	// USER
	const businessCtx = useContext(BusinessContext)

	// OBTENER PRODUCTOS
	useProducts(setLocalProducts, businessCtx.business?.id)

	// GUARDAR PRODUCTOS GLOBAL
	const setProducts = (products: { [id: string]: Product }) =>
		setLocalProducts((prevProducts: { [id: string]: Product }) => {
			// ACTUALIZAR
			const newProducts: { [id: string]: Product } = { ...prevProducts, ...products }

			// GUARDAR EN NEGOCIO
			replaceBusiness(businessCtx.business?.id, { products: Object.keys(newProducts) })

			// GUARDAR EN DB PRODUCTOS
			replaceProducts(newProducts, businessCtx.business?.id)

			return newProducts
		})

	return (
		<ProductsContext.Provider value={{ products, setProducts }}>
			{props.children}
		</ProductsContext.Provider>
	)
}

export default ProductsProvider
