// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import ColorButton from 'components/button'

// COMPONENTES
import Extra from './components/extra'
import TabInfo from '../tabInfo'

// ICONS
import AddTwoTone from '@mui/icons-material/AddTwoTone'

// HOOKS
import addExtra, { removeExtra } from './tools'
import { GeneralProps } from '../../tools'
import useStrings from 'hooks/lang'
import useDefExtras from './hooks'

const Extras: React.FC<GeneralProps> = ({ show, productRef }) => {
	// STRINGS
	const { $ } = useStrings()

	// LISTA DE EXTRAS
	const [extras, setExtras] = useState<ExtendedExtra[]>([])

	// AGREGAR EXTRA
	const addExtraEv = () => addExtra(productRef, setExtras)

	// BORRAR EXTRA
	const deleteExtra = (extIndex: number) => () => removeExtra(extIndex, productRef, setExtras)

	// EXTRAS INICIALES
	useDefExtras(productRef, setExtras)

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TabInfo
				title={$`Variables dinamicas`}
				body={$`Cada opción agrega un precio adicional al total con diferentes formas de seleccion.`}>
				<ColorButton
					color='primary'
					variant='outlined'
					onClick={addExtraEv}
					startIcon={<AddTwoTone />}
					$style={{
						color: 'var(--primary)',
						borderColor: 'var(--primary)',
					}}>{$`Agregar`}</ColorButton>
			</TabInfo>

			{/* EXTRAS */}
			{extras.map((extra: ExtendedExtra, index: number) => (
				<Extra
					index={index}
					extra={extra}
					key={`ext_${extra.id}`}
					productRef={productRef}
					deleteExtra={deleteExtra(index)}
				/>
			))}
		</div>
	)
}

export default Extras
