// REACT
import React, { useState } from 'react'

// MATERIAL
import ColorButton from 'components/button'

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
				<ColorButton
					fullWidth
					variant='outlined'
					onClick={changeFilterEv}
					startIcon={<SortByAlphaTwoTone />}
					$style={{ backgroundColor: '#fbfbfb' }}>
					{filter === 'asc' ? $`Filtro ascendente` : $`Filtro descendente`}
				</ColorButton>
			</Header>
			<NewForm />
			<FormsList filter={filter} />
		</View>
	)
}

export default Forms
