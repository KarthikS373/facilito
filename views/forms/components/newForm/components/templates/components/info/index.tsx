// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import FileCopyTwoTone from '@material-ui/icons/FileCopyTwoTone'

// HOC
import withStrings from 'hoc/lang'

const TemplatesInfo: React.FC = withStrings(({ $ }) => {
	return (
		<div className={Styles.container}>
			<FileCopyTwoTone />
			<div>
				<h2>{$`Iniciar con plantilla`}</h2>
				<p>{$`Crea tus formularios desde diseños personalizados.`}</p>
			</div>
		</div>
	)
})

export default TemplatesInfo
