// REACT
import React, { useState } from 'react'

// MATERIAL
import Button from '@material-ui/core/Button'

// HOC
import useStrings from 'hooks/lang'

// UTILS
import useDefaultFilter from 'hooks/filters'
import { changeFilter } from 'utils/tools'

// ICON
import SortByAlphaTwoTone from '@material-ui/icons/SortByAlphaTwoTone'

// COMPONENTES
import FormsList from './components/formsList'
import NewForm from './components/newForm'
import Header from 'components/header'

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
		<>
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
		</>
	)
}

export default Forms
