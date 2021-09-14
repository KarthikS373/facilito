// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import Link from 'components/link'

// MATERIAL
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

// ICONOS
import ShoppingCartTwoTone from '@material-ui/icons/ShoppingCartTwoTone'
import DescriptionTwoTone from '@material-ui/icons/DescriptionTwoTone'
import ForwardTwoTone from '@material-ui/icons/ForwardTwoTone'
import SearchTwoTone from '@material-ui/icons/SearchTwoTone'

// CONTEXTO
import ProductsContext from 'context/products'
import FormsContext from 'context/forms'

// STRINGS
import useStrings from 'hooks/lang'

// UTILS
import searchItems, { LinkInfo } from './utils/tools'

const Search: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// ESTADO
	const [links, setLinks] = useState<LinkInfo[]>([])

	// CONTEXTO
	const productsCtx = useContext(ProductsContext)
	const formsCtx = useContext(FormsContext)

	// PRODUCTOS
	const products: Product[] = Object.values(productsCtx.products)

	// INPUT
	const onChangeSearch = (ev: React.ChangeEvent<HTMLInputElement>) =>
		searchItems(ev, formsCtx.forms, products, setLinks)

	// OCULTAR BUSQUEDA
	const hideSearchBox = () => setLinks([])

	return (
		<ClickAwayListener onClickAway={hideSearchBox}>
			<div className={Styles.container}>
				<TextField
					type='search'
					variant='outlined'
					className={Styles.search}
					onChange={onChangeSearch}
					placeholder={$`Buscar formularios, productos`}
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
