// REACT
import React, { useState } from 'react'

// MATERIAL
import Button from '@mui/material/Button'

// HOC
import useStrings from 'hooks/lang'

// UTILS
import useDefaultFilter from 'hooks/filters'
import { changeFilter } from 'utils/tools'

// ICON
import SortByAlphaTwoTone from '@mui/icons-material/SortByAlphaTwoTone'

// COMPONENTES
import FormsList from './components/formsList'
import NewForm from './components/newForm'
import Header from 'components/header'
import View from 'components/view'

const Forms: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// FILTRO
	const [filter, setFilter] = useState<string>('asc')

	// CAMBIAR FILTRO
	const changeFilterEv = () =>
		changeFilter('forms-filter', filter === 'asc' ? 'des' : 'asc', setFilter)

	// ASIGNAR FILTRO DE INICIO
	useDefaultFilter('forms-filter', 'asc', setFilter)

	return (
		<View>
			<Header>
				<Button
					fullWidth
					variant='outlined'
					onClick={changeFilterEv}
					style={{ backgroundColor: '#fbfbfb' }}
					startIcon={<SortByAlphaTwoTone />}>
					{filter === 'asc' ? $`Filtrar ascendente` : $`Filtrar desendente`}
				</Button>
			</Header>
			<NewForm />
			<FormsList filter={filter} />
		</View>
	)
}

export default Forms
