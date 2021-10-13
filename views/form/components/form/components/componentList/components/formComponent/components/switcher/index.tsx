// REACT
import React from 'react'

// COMPONENTS
import FormMultipleOptions from '../../../multipleOptions'
import SectionText from '../../../sectionText'
import DatePicker from '../../../datepicker'
import TextInput from '../../../textInput'

// MATERIAL
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'

// OBTENER COMPONENTE
interface ComponentSwitcherProps {
	name: string
}
const ComponentSwitcher: React.FC<ComponentSwitcherProps> = ({ name }) => {
	switch (name) {
		case 'short':
			return <TextInput />
		case 'long':
			return <TextInput isLong />
		case 'radios':
			return <FormMultipleOptions InputElement={Radio} isRadio />
		case 'checkboxes':
			return <FormMultipleOptions InputElement={Checkbox} />
		case 'select':
			return <FormMultipleOptions />
		case 'link':
			return <SectionText isAnchor />
		case 'date':
			return <DatePicker />
		case 'title':
			return <SectionText />
		default:
			return <TextInput />
	}
}

export default ComponentSwitcher
