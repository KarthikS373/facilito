// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'

// ICONOS
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone'

// STRINGS
import useStrings from 'hooks/lang'

const Info: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<PageInfo
			icon={<InventoryTwoToneIcon />}
			title={$`Historial de inventarios`}
			description={$`En esta sección podrás ver el historial de inventarios de tu negocio.`}
		/>
	)
}

export default Info
