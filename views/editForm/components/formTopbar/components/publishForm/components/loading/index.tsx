import React from 'react'

// MATERIAL
import CircularProgress from '@mui/material/CircularProgress'

// HOOKS
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

const PublicLoading: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<div className={Styles.publishAnimation}>
			<CircularProgress color='primary' />
			<p>{$`Publicando..`}</p>
		</div>
	)
}

export default PublicLoading
