// REACT
import React, { useContext, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// TIPOS
import type { SelectChangeEvent } from '@mui/material/Select'

// COMPONENTES
import TabInfo from '../tabInfo'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// ICONOS
import FormatColorTextTwoToneIcon from '@mui/icons-material/FormatColorTextTwoTone'
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone'

// CONTEXTO
import BusinessContext from 'context/business'

// HOOKS
import useStrings from 'hooks/lang'

// UTILS
import changeProductProps from '../../utils/tools'

// PROPS
interface GeneralProps {
	show: boolean
	productRef: React.MutableRefObject<Product>
}
const General: React.FC<GeneralProps> = ({ show, productRef }) => {
	// STRINGS
	const { $ } = useStrings()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// ESTADO DE CATEGORIA
	const [category, setCategory] = useState<string>(productRef.current.category)

	// ACTUALIZAR
	const handleInputs = (ev: React.ChangeEvent<HTMLInputElement>) =>
		changeProductProps(ev, productRef)

	// CAMBIAR CATEGORIAS
	const changeCategory = (ev: SelectChangeEvent<string>) => {
		const { value } = ev.target
		setCategory(value)
		productRef.current.category = value
	}

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TabInfo
				title={$`Informacion general`}
				body={$`Estos datos se mostraran en las tarjetas de producto en tus formularios seleccionados.`}
			/>

			<TextField
				id='title'
				name='title'
				variant='outlined'
				onChange={handleInputs}
				label={$`Título del producto`}
				placeholder={$`Añade un título corto`}
				defaultValue={productRef.current.title || ''}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<FormatColorTextTwoToneIcon color='primary' />
						</InputAdornment>
					),
				}}
			/>
			<TextField
				multiline
				maxRows={3}
				id='description'
				variant='outlined'
				name='description'
				onChange={handleInputs}
				defaultValue={productRef.current.description}
				label={$`Descripción del producto`}
				placeholder={$`Añade una descripción`}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<ChatTwoToneIcon color='primary' />
						</InputAdornment>
					),
				}}
			/>

			<hr />
			<div className={Styles.row}>
				<FormControl fullWidth variant='outlined'>
					<InputLabel htmlFor='category' id='category-label'>{$`Categoria`}</InputLabel>
					<Select
						id='category'
						name='category'
						color='primary'
						variant='outlined'
						label={$`Categoria`}
						onChange={changeCategory}
						labelId='category-label'
						value={category === $` Sin categoria` ? '' : category}
						inputProps={{
							name: 'category',
							id: 'category',
						}}>
						{businessCtx.business?.categories?.map((category: string) => (
							<MenuItem key={category} value={category}>
								{category}
							</MenuItem>
						))}
						<MenuItem value={$`Nueva categoria`}>{$`Nueva categoria`}</MenuItem>
					</Select>
				</FormControl>
				{category === $`Nueva categoria` && (
					<TextField
						defaultValue=''
						id='new_category'
						variant='outlined'
						name='new_category'
						onChange={handleInputs}
						style={{ marginLeft: '15px', minWidth: '250px' }}
						label={$`Categoria del producto`}
						placeholder={$`Añade una categoria`}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<CategoryTwoToneIcon color='primary' />
								</InputAdornment>
							),
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default General
