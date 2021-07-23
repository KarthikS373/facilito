// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import FilterListTwoTone from '@material-ui/icons/FilterListTwoTone'
import CategoryTwoTone from '@material-ui/icons/CategoryTwoTone'
import StoreTwoTone from '@material-ui/icons/StoreTwoTone'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'

// MATERIAL
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

// STRINGS
import withStrings from 'hoc/lang'

interface InfoProps {
	filter: string
	onOpenSideBar: () => unknown
	setFilter: (filter: string) => unknown
}
const Info: React.FC<InfoProps> = withStrings(({ $, filter, setFilter, onOpenSideBar }) => {
	// FILTROS
	const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(null)
	const openFilterMenu = Boolean(filterAnchor)

	// ASIGNAR BOTON
	const handleFilterAnchor = (ev: React.MouseEvent<HTMLButtonElement>) =>
		setFilterAnchor(ev.currentTarget)

	// CERRAR MENU DE FILTROS
	const closeFilterMenu = () => setFilterAnchor(null)

	// ASIGNAR FILTROS
	const changeFilter = (filter: string) => () => {
		setFilter(filter)
		closeFilterMenu()
	}

	return (
		<>
			<div className={Styles.container}>
				<div className={Styles.info}>
					<StoreTwoTone />
					<div className={Styles.text}>
						<h2>{$`Catalogo de productos`}</h2>
						<p>{$`Agrega productos a tu inventario y muestralos en el carrito de compras.`}</p>
					</div>
				</div>
				<div>
					<Button
						variant='outlined'
						onClick={onOpenSideBar}
						style={{ marginRight: '15px' }}
						startIcon={<CategoryTwoTone />}>
						{$`Abrir categorias`}
					</Button>
					<Button onClick={handleFilterAnchor} variant='outlined' startIcon={<FilterListTwoTone />}>
						{(filter === 'naz' && $`Nombre A-Z`) ||
							(filter === 'nza' && $`Nombre Z-A`) ||
							(filter === 'caz' && $`Categoria A-Z`) ||
							(filter === 'cza' && $`Categoria Z-A`)}
					</Button>
				</div>
			</div>
			<PopperMenuList
				style={{ zIndex: 3 }}
				open={openFilterMenu}
				placement='bottom-end'
				anchorEl={filterAnchor}
				onClose={closeFilterMenu}>
				<MenuItem>
					<Button
						fullWidth
						style={{ height: '40px' }}
						onClick={changeFilter('naz')}
						variant='outlined'>{$`Nombre A-Z`}</Button>
				</MenuItem>
				<MenuItem>
					<Button
						fullWidth
						style={{ height: '40px' }}
						onClick={changeFilter('nza')}
						variant='outlined'>{$`Nombre Z-A`}</Button>
				</MenuItem>
				<MenuItem>
					<Button
						fullWidth
						style={{ height: '40px' }}
						onClick={changeFilter('caz')}
						variant='outlined'>{$`Categoria A-Z`}</Button>
				</MenuItem>
				<MenuItem>
					<Button
						fullWidth
						style={{ height: '40px' }}
						onClick={changeFilter('cza')}
						variant='outlined'>{$`Categoria Z-A`}</Button>
				</MenuItem>
			</PopperMenuList>
		</>
	)
})

export default Info
