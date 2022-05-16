import React, { useContext } from 'react'

// ICONOS
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone'
import CardMembershipTwoTone from '@mui/icons-material/CardMembershipTwoTone'
import PrintTwoTone from '@mui/icons-material/PrintTwoTone'

// HOOKS
import BusinessContext from 'context/business'
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
	const { $, langCode } = useStrings()

	// PERMISOS
	const businessCtx = useContext(BusinessContext)

	// SERVICIO DE IMPRESIÓN
	const openPrintService = () =>
		window.postMessage(
			{
				action: 'print',
				data: langCode,
			},
			'*'
		)

	const permissions = businessCtx.business?.permissions?.print ?? false

	return (
		<PageInfo
			title={$`Configurar negocio`}
			description={$`Agregar informacion general y bancaria sobre el negocio.`}
			icon={<AdminPanelSettingsTwoToneIcon />}>
			<Button
				fullWidth
				onClick={permissions ? openPrintService : onAction}
				startIcon={permissions ? <PrintTwoTone /> : <CardMembershipTwoTone />}
				variant='outlined'>
				{permissions ? $`Impresión` : $`Subscripción`}
			</Button>
		</PageInfo>
	)
}

export default Info
