// REACT
import React from 'react'

// NEXT
import dynamic from 'next/dynamic'

// MATERIAL
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'

// COMPONENTS
const FormMultipleOptions = dynamic(() => import('../../../multipleOptions'))
const SectionText = dynamic(() => import('../../../sectionText'))
const DatePicker = dynamic(() => import('../../../datepicker'))
const TextInput = dynamic(() => import('../../../textInput'))
const Geolocation = dynamic(() => import('../../../geo'))
const FormMedia = dynamic(() => import('../../../media'))

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
		case 'image':
			return <FormMedia />
		case 'video':
			return <FormMedia isVideo />
		case 'geo':
			return <Geolocation />
		default:
			return <TextInput />
	}
}

export default ComponentSwitcher
