// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

// ICONOS
import FormatColorTextTwoToneIcon from '@material-ui/icons/FormatColorTextTwoTone'
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone'
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone'

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

	// ESTADO
	const [generalState, setGeneralState] = useState<Product>(productRef.current)

	// ACTUALIZAR
	const handleInputs = (ev: React.ChangeEvent<HTMLInputElement>) =>
		changeProductProps(ev, productRef, setGeneralState)

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TextField
				id='title'
				name='title'
				variant='outlined'
				onChange={handleInputs}
				value={generalState.title}
				label={$`Título del producto`}
				placeholder={$`Añade un título corto`}
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
				value={generalState.description}
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
						onChange={handleInputs}
						labelId='category-label'
						value={generalState.category === $` Sin categoria` ? '' : generalState.category}
						defaultValue={$` Sin Categoria`}
						inputProps={{
							name: 'category',
							id: 'category',
						}}>
						{businessCtx.business?.categories.map((category: string) => (
							<MenuItem key={category} value={category}>
								{category}
							</MenuItem>
						))}
						<MenuItem value={$`Nueva categoria`}>{$`Nueva categoria`}</MenuItem>
					</Select>
				</FormControl>
				{generalState.category === $`Nueva categoria` && (
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
