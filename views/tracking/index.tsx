// REACT
import React, { useState } from 'react'

// UTILS
import useDefaultFilter from 'hooks/filters'
import { changeFilter } from 'utils/tools'

// COMPONENTES
import FormList from './components/formList'
import Header from 'components/header'
import Info from './components/info'
import View from 'components/view'

const Tracking: React.FC = () => {
	// FILTRO
	const [filter, setFilter] = useState<string>('asc')

	// CAMBIAR FILTRO
	const changeFilterEv = () =>
		changeFilter('tracking-filter', filter === 'asc' ? 'des' : 'asc', setFilter)

	// ASIGNAR FILTRO DE INICIO
	useDefaultFilter('tracking-filter', 'asc', setFilter)

	return (
		<View>
			<Header />
			<Info changeFilter={changeFilterEv} filter={filter} />
			<FormList filter={filter} />
		</View>
	)
}

export default Tracking
