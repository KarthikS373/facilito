// REACT
import React, { useContext, useState } from 'react'

// CONTEXT
import BusinessContext from 'context/business'
import ProductsContext from 'context/products'

// HOOKS
import useProducts from 'hooks/products'

// UTILS
import { replaceProducts } from 'utils/products'

const ProductsProvider: React.FC = (props) => {
	// ESTADO
	const [products, setLocalProducts] = useState<{ [id: string]: Product }>({})

	// USER
	const businessCtx = useContext(BusinessContext)

	// OBTENER PRODUCTOS
	useProducts(setLocalProducts, businessCtx.business?.id)

	// GUARDAR PRODUCTOS GLOBAL
	const setProducts = (products: { [id: string]: Product }, merge: boolean = true) =>
		setLocalProducts((prevProducts: { [id: string]: Product }) => {
			// ACTUALIZAR
			const newProducts: { [id: string]: Product } = merge
				? { ...prevProducts, ...products }
				: products

			window.Snack('Guardando...')
			// GUARDAR EN DB PRODUCTOS
			replaceProducts(newProducts, businessCtx.business?.id).then(() =>
				window.Snack('Productos guardados')
			)

			// GUARDAR EN NEGOCIO
			businessCtx.setBusinessDB({ products: Object.keys(newProducts) })
			return newProducts
		})

	return (
		<ProductsContext.Provider value={{ products, setProducts }}>
			{props.children}
		</ProductsContext.Provider>
	)
}

export default ProductsProvider
