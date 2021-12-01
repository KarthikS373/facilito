import { createContext, Context } from 'react'

// KEYS
export interface ProductContextProps {
	products: { [id: string]: Product }
	setProducts: (
		products: { [id: string]: Product },
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
