// REACT
import React, { useState, useEffect } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Button from '@mui/material/Button'

// COMPONENTES
import Extra from './components/extra'

// ICONS
import AddTwoTone from '@mui/icons-material/AddTwoTone'

// HOOKS
import useStrings from 'hooks/lang'
import addExtra, { removeExtra } from './utils/tools'

interface GeneralProps {
	show: boolean
	productRef: React.MutableRefObject<Product>
}

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
	useEffect(() => {
		setExtras(productRef.current.extras?.map((ext: Extra, id: number) => ({ ...ext, id })) || [])
	}, [])

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<div className={Styles.info}>
				<div className={Styles.text}>
					<h3>{$`Variables dinamicas`}</h3>
					<p>{$`Son opciones o extras agregadas a tu producto, con diferentes formas de seleccion.`}</p>
				</div>
				<Button
					color='primary'
					variant='outlined'
					onClick={addExtraEv}
					startIcon={<AddTwoTone />}>{$`Agregar`}</Button>
			</div>

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
