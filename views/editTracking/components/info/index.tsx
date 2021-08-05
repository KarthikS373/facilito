// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'

// MATERIAL
import Button from '@material-ui/core/Button'

// ICONOS
import BubbleChartTwoTone from '@material-ui/icons/BubbleChartTwoTone'
import AddCircleTwoTone from '@material-ui/icons/AddCircleTwoTone'

// HOOKS
import useStrings from 'hooks/lang'

// PROPS
interface InfoProps {
	onAdd: () => void
}
const Info: React.FC<InfoProps> = ({ onAdd }) => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<PageInfo
			icon={<BubbleChartTwoTone />}
			title={$`Configura tus estados`}
			description={$`Asigna titulos, descripciones y colores para cada estado.`}>
			<Button onClick={onAdd} fullWidth startIcon={<AddCircleTwoTone />} variant='outlined'>
				{$`Agregar estado`}
			</Button>
		</PageInfo>
	)
}

export default Info
