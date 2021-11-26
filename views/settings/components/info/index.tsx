import React from 'react'

// ICONOS
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone'
import CardMembershipTwoTone from '@mui/icons-material/CardMembershipTwoTone'

// HOOKS
import useStrings from 'hooks/lang'

// COMPONENTES
import PageInfo from 'components/pageInfo'

// MATERIAL
import Button from '@mui/material/Button'

interface InfoProps {
	onAction?: EmptyFunction
}
const Info: React.FC<InfoProps> = ({ onAction }) => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<PageInfo
			title={$`Configurar negocio`}
			description={$`Agregar informacion general y bancaria sobre el negocio.`}
			icon={<AdminPanelSettingsTwoToneIcon />}>
			<Button
				fullWidth
				onClick={onAction}
				startIcon={<CardMembershipTwoTone />}
				variant='outlined'>{$`Subscripción`}</Button>
		</PageInfo>
	)
}

export default Info
