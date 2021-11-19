// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import FileCopyTwoTone from '@mui/icons-material/FileCopyTwoTone'

// HOC
import useStrings from 'hooks/lang'

const TemplatesInfo: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<div className={Styles.container}>
			<FileCopyTwoTone />
			<div>
				<h2>{$`Iniciar con plantilla`}</h2>
				<p>{$`Crea tus tiendas desde diseños personalizados.`}</p>
			</div>
		</div>
	)
}

export default TemplatesInfo
