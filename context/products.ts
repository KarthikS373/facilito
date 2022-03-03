import { createContext, Context } from 'react'

// KEYS
export interface ProductContextProps {
	products: Record<string, Product>
	setProducts: (
		products: Record<string, Product>,
		merge?: boolean,
		initialSKU?: string,
		onSuccess?: () => unknown
	) => unknown
}

// VALOR POR DEFECTO
const DefContext: ProductContextProps = {
	products: {},
	setProducts: () => null,
}

// CONTEXTO
const ProductsContext: Context<ProductContextProps> = createContext(DefContext)

export default ProductsContext
