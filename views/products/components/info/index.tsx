// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import CategoryTwoTone from '@material-ui/icons/CategoryTwoTone'
import StoreTwoTone from '@material-ui/icons/StoreTwoTone'

// MATERIAL
import Button from '@material-ui/core/Button'

// STRINGS
import withStrings from 'hoc/lang'

interface InfoProps {
	onOpenSideBar: () => unknown
}
const Info: React.FC<InfoProps> = withStrings(({ $, onOpenSideBar }) => {
	return (
		<div className={Styles.container}>
			<div className={Styles.info}>
				<StoreTwoTone />
				<div className={Styles.text}>
					<h2>{$`Catalogo de productos`}</h2>
					<p>{$`Agrega productos al inventario y muestralos en el carrito.`}</p>
				</div>
			</div>
			<div className={Styles.actions}>
				<Button
					fullWidth
					variant='outlined'
					onClick={onOpenSideBar}
					startIcon={<CategoryTwoTone />}>
					{$`Abrir categorias`}
				</Button>
			</div>
		</div>
	)
})

export default Info
