import React from 'react'

// HOOKS
import useStrings from 'hooks/lang'

// COMPONENTES
import AnswerStates from 'views/answers/components/answersList/components/sideBar/components/states'

// ICONOS
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone'

// ESTILOS
import Styles from './style.module.scss'

interface StatesProps {
	data?: FormAnswerTracking
	formData: Form | null
}

const States: React.FC<StatesProps> = ({ formData, data }) => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<div className={Styles.container}>
			<div className={Styles.info}>
				<h2>
					<SummarizeTwoToneIcon />
					{$`Pedido de`}
					<span>{data?.data.personal_name_0.answer.split(' ')[0].toLowerCase()}</span>
				</h2>
				<p>{$`Aqui se muestra el estado de tu pedido en tiempo real.`}</p>
			</div>
			<AnswerStates hideActions steps={formData?.tracking ?? []} activeStep={data?.state ?? 0} />
		</div>
	)
}

export default States
