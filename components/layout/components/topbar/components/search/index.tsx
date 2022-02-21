// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import Link from 'components/link'

// MATERIAL
import ClickAwayListener from '@mui/material/ClickAwayListener'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'

// ICONOS
import ShoppingCartTwoTone from '@mui/icons-material/ShoppingCartTwoTone'
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone'
import ForwardTwoTone from '@mui/icons-material/ForwardTwoTone'
import SearchTwoTone from '@mui/icons-material/SearchTwoTone'

// CONTEXTO
import ProductsContext from 'context/products'
import FormsContext from 'context/forms'

// STRINGS
import useStrings from 'hooks/lang'

// UTILS
import searchItems, { LinkInfo } from './tools'

const Search: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// ESTADO
	const [links, setLinks] = useState<LinkInfo[]>([])

	// CONTEXTO DE PRODUCTOS
	const productsCtx = useContext(ProductsContext)

	// CONTEXTO DE FORMULARIOS
	const formsCtx = useContext(FormsContext)

	// PRODUCTOS
	const products: Product[] = Object.values(productsCtx.products)

	// INPUT
	const onChangeSearch = (ev: React.ChangeEvent<HTMLInputElement>) =>
		searchItems(ev, formsCtx.forms, products, setLinks)

	// OCULTAR BUSQUEDA
	const hideSearchBox = () => {
		if (links.length > 0) setLinks([])
	}

	return (
		<ClickAwayListener onClickAway={hideSearchBox}>
			<div className={Styles.container}>
				<TextField
					type='search'
					variant='outlined'
					className={Styles.search}
					onChange={onChangeSearch}
					placeholder={$`Buscar tiendas, productos`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchTwoTone />
							</InputAdornment>
						),
					}}
				/>
				{links.length > 0 && (
					<Paper className={Styles.searchBox}>
						<ul>
							{links.map((link: LinkInfo) => (
								<li className={Styles.row} key={link.id}>
									{/* ICONO */}
									{link.type === 'form' ? <DescriptionTwoTone /> : <ShoppingCartTwoTone />}

									{/* INFORMACIÓN */}
									<div>
										<strong>{link.title}</strong>
										{link.description && <p>{link.description}</p>}
									</div>

									{/* LINK */}
									<Link
										passHref
										id={link.id}
										rKey={link.type === 'form' ? 'newForm' : 'editProduct'}>
										<IconButton onClick={hideSearchBox}>
											<ForwardTwoTone />
										</IconButton>
									</Link>
								</li>
							))}
						</ul>
					</Paper>
				)}
			</div>
		</ClickAwayListener>
	)
}

export default Search
