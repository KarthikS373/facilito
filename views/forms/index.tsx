// REACT
import React, { useState } from 'react'

// MATERIAL
import Button from '@material-ui/core/Button'

// HOC
import withStrings from 'hoc/lang'

// UTILS
import useDefaultFilter from './utils/hooks'
import changeFilter from './utils/filters'

// ICON
import SortByAlphaTwoTone from '@material-ui/icons/SortByAlphaTwoTone'

// COMPONENTES
import FormsList from './components/formsList'
import NewForm from './components/newForm'
import Header from 'components/header'

const Forms: React.FC = withStrings(({ $ }) => {
	// FILTRO
	const [filter, setFilter] = useState<'asc' | 'des'>('asc')

	// CAMBIAR FILTRO
	const changeFilterEv = () => changeFilter(filter, setFilter)

	// ASIGNAR FILTRO DE INICIO
	useDefaultFilter(setFilter)

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
})

export default Forms
