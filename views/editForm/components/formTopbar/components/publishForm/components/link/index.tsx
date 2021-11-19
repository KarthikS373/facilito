import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'
import { useTheme } from '@mui/material/styles'

// CONTEXT
import BusinessContext from 'context/business'
import useStrings from 'hooks/lang'

interface PublicLinkProps {
	url: string
}
const PublicLink: React.FC<PublicLinkProps> = ({ url }) => {
	// BUSINESS
	const company = useContext(BusinessContext)

	// STRINGS
	const { $ } = useStrings()

	// TEMA
	const theme = useTheme()

	return (
		<p>
			<a
				style={{ color: theme.palette.primary.main }}
				className={Styles.link}
				rel='noopener noreferrer'
				href={`${window.location.origin}/f/${company.business?.url}/${url}`}
				target='_blank'>{`${window.location.origin}/f/${company.business?.url}/${url}`}</a>{' '}
			{$`¿Te gustaría ver tu tienda ahora?`}
		</p>
	)
}

export default PublicLink
