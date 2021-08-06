// REACT
import React, { useContext } from 'react'

// COMPONENTES
import Header from 'components/header'

// CONTEXTO
import BusinessContext from 'context/business'

// HOOKS
import useStrings from 'hooks/lang'

// PROPS
interface ProductProps {
	productID?: string
}
const Product: React.FC<ProductProps> = () => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// STRINGS
	const { $ } = useStrings()

	return (
		<>
			<Header
				customDescription={`${
					businessCtx.business?.products.length || 0
				} ${$`producto(s) creados`}`}
			/>
		</>
	)
}

export default Product
