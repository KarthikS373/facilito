// REACT
import React from 'react'

// NEXT
import Link from 'next/link'

// COMPONENTES
import PageInfo from 'components/pageInfo'

// ICONOS
import QuestionAnswerTwoTone from '@material-ui/icons/QuestionAnswerTwoTone'
import DescriptionTwoTone from '@material-ui/icons/DescriptionTwoTone'

// MATERIAL
import Button from '@material-ui/core/Button'

// STRINGS
import useStrings from 'hooks/lang'

interface InfoProps {
	formID: string
}
const Info: React.FC<InfoProps> = ({ formID }) => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<PageInfo
			title={$`Lista de respuestas`}
			icon={<QuestionAnswerTwoTone />}
			description={$`Imprime y visualiza todas las respuestas de este formulario.`}>
			<Link href={`/formularios/${formID}`}>
				<Button fullWidth variant='outlined' startIcon={<DescriptionTwoTone />}>
					{$`Abrir formulario`}
				</Button>
			</Link>
		</PageInfo>
	)
}

export default Info
