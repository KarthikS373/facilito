// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import FileCopyTwoTone from '@material-ui/icons/FileCopyTwoTone'

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
				<p>{$`Crea tus formularios desde diseños personalizados.`}</p>
			</div>
		</div>
	)
}

export default TemplatesInfo
