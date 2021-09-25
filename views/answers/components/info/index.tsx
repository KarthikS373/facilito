// REACT
import React from 'react'

// COMPONENTES
import PageInfo from 'components/pageInfo'
import Link from 'components/link'

// ICONOS
import QuestionAnswerTwoTone from '@mui/icons-material/QuestionAnswerTwoTone'
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone'

// MATERIAL
import Button from '@mui/material/Button'

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
			<Link rKey='forms' id={formID}>
				<Button fullWidth variant='outlined' startIcon={<DescriptionTwoTone />}>
					{$`Abrir formulario`}
				</Button>
			</Link>
		</PageInfo>
	)
}

export default Info
