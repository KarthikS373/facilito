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
	const setProducts = (
		products: { [id: string]: Product },
		merge = true,
		initialSKU = '',
		onSuccess?: () => unknown
	) =>
		setLocalProducts((prevProducts: { [id: string]: Product }) => {
			// ACTUALIZAR
			const tmpProducts = { ...prevProducts }
			if (initialSKU?.length) delete tmpProducts[initialSKU]

			const newProducts: { [id: string]: Product } = merge
				? { ...tmpProducts, ...products }
				: { ...products }

			// ERROR SKU DUPLICADO
			const isRepeatedSKU = merge
				? Object.keys(tmpProducts).some((sku) =>
						Object.keys(products).some((newSku) => newSku === sku)
				  )
				: false

			if (!isRepeatedSKU) {
				window.Snack('Guardando...')

				// GUARDAR EN DB PRODUCTOS
				replaceProducts(newProducts, businessCtx.business?.id).then(() =>
					window.Snack('Producto(s) guardados')
				)

				// GUARDAR EN NEGOCIO
				businessCtx.setBusinessDB({ products: Object.keys(newProducts) })
				if (onSuccess) onSuccess()
				return newProducts
			} else {
				window.Alert({
					title: 'Ocurrio un error',
					body: 'Este SKU ya se esta usando en otro producto, los SKUs deben ser unicos, escribe uno nuevo.',
					type: 'error',
				})

				return prevProducts
			}
		})

	return (
		<ProductsContext.Provider value={{ products, setProducts }}>
			{props.children}
		</ProductsContext.Provider>
	)
}

export default ProductsProvider
