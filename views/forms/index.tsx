// REACT
import React, { useState, useEffect } from 'react'

// MATERIAL
import Button from '@material-ui/core/Button'

// HOC
import withStrings from 'hoc/lang'

// ICON
import SortByAlphaTwoTone from '@material-ui/icons/SortByAlphaTwoTone'

// COMPONENTES
import FormsList from './components/formsList'
import NewForm from './components/newForm'
import Header from './components/header'

const Forms: React.FC = withStrings(({ $ }) => {
	// FILTRO
	const [filter, setFilter] = useState<'asc' | 'des'>('asc')

	// CAMBIAR FILTRO
	const changeFilter = () => {
		const newFilter: 'asc' | 'des' = filter === 'asc' ? 'des' : 'asc'
		window.localStorage.setItem('forms-filter', newFilter)
		setFilter(newFilter)
	}

	// ASIGNAR FILTRO DE INICIO
	useEffect(() => {
		setFilter((window.localStorage.getItem('forms-filter') as 'asc' | 'des' | null) ?? 'asc')
	}, [])

	return (
		<>
			<Header>
				<Button
					fullWidth
					variant='outlined'
					onClick={changeFilter}
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
