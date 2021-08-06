// REACT
import React, { useContext } from 'react'

// COMPONENTES
import Header from 'components/header'
import Link from 'components/link'

// ICONOS
import SaveTwoTone from '@material-ui/icons/SaveTwoTone'

// MATERIAL
import Button from '@material-ui/core/Button'

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
				} ${$`producto(s) creados`}`}>
				<Link rKey='products' passHref>
					<Button
						color='primary'
						variant='contained'
						style={{ color: '#fff' }}
						startIcon={<SaveTwoTone />}>
						{$`Guardar producto`}
					</Button>
				</Link>
			</Header>
		</>
	)
}

export default Product
