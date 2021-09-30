import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	products: { [id: string]: Product }
	setProducts: (products: { [id: string]: Product }, merge?: boolean) => unknown
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
	products: {},
	setProducts: () => null,
}

// CONTEXTO
const ProductsContext: Context<ContextProps> = createContext(DefContext)

export default ProductsContext
