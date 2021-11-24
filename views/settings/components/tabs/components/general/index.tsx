// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import TabInfo from '../tabInfo'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// ICONOS
import FormatColorTextTwoToneIcon from '@mui/icons-material/FormatColorTextTwoTone'
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone'

// HOOKS
import onChangeInput, { onChangeCategory } from './tools'
import getCategories from './utils/initials'
import useStrings from 'hooks/lang'

// CONTEXTO
import SettingsContext from 'views/settings/context'

interface TabProps {
	show: boolean
}
const General: React.FC<TabProps> = ({ show }) => {
	// STRINGS
	const { $ } = useStrings()

	// CATEGORIAS
	const categories = getCategories($)

	// CONTEXTO
	const { businessRef } = useContext(SettingsContext)

	// GUARDAR DATOS
	const handleInputs = (ev: React.ChangeEvent<HTMLInputElement>) => onChangeInput(ev, businessRef)

	// GUARDAR CATEGORIA
	const handleCategory = (ev: SelectChangeEvent) => onChangeCategory(ev, businessRef)

	return (
		<div style={{ display: show ? 'grid' : 'none' }} className={Styles.container}>
			<TabInfo
				title={$`Informacion general`}
				body={$`Esta informacion se mostrara en todas tus tiendas asi como en los links`}
			/>

			<TextField
				id='name'
				name='name'
				variant='outlined'
				onChange={handleInputs}
				label={$`Nombre del negocio`}
				placeholder={$`Nombre legal de tu marca`}
				defaultValue={businessRef.current?.name ?? ''}
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
				label={$`Descripción del negocio`}
				placeholder={$`Añade una descripción`}
				defaultValue={businessRef.current?.description ?? ''}
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
						labelId='category-label'
						onChange={handleCategory}
						defaultValue={businessRef.current?.category ?? ''}
						inputProps={{
							name: 'category',
							id: 'category',
						}}>
						{categories?.map((category: string) => (
							<MenuItem key={category} value={category}>
								{category}
							</MenuItem>
						))}
						<MenuItem value={$`Nueva categoria`}>{$`Nueva categoria`}</MenuItem>
					</Select>
				</FormControl>
			</div>
		</div>
	)
}

export default General
