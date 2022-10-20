// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'
import Link from 'components/link'

// MATERIAL
import Button from '@mui/material/Button'

// ICONOS
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone'
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone'

// STRINGS
import useStrings from 'hooks/lang'

const Info: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<PageInfo
			icon={<ReceiptLongTwoToneIcon />}
			title={$`Lista de clientes`}
			description={$`Base de clientes registrados a traves de las tiendas.`}>
			<Link rKey='forms'>
				<Button fullWidth variant='outlined' startIcon={<StorefrontTwoToneIcon />}>
					{$`Ver tiendas`}
				</Button>
			</Link>
		</PageInfo>
	)
}

export default Info
