// REACT
import React from 'react'

// MATERIAL
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'

// ICONOS
import ArrowDropDownCircleOutlined from '@mui/icons-material/ArrowDropDownCircleOutlined'
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined'
import RadioButtonCheckedOutlined from '@mui/icons-material/RadioButtonCheckedOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'
import ShortTextOutlined from '@mui/icons-material/ShortTextOutlined'
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined'
import SlideshowRounded from '@mui/icons-material/SlideshowRounded'
import SubjectOutlined from '@mui/icons-material/SubjectOutlined'
import EventOutlined from '@mui/icons-material/EventOutlined'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import RoomOutlined from '@mui/icons-material/RoomOutlined'
import TextFields from '@mui/icons-material/TextFields'
import Link from '@mui/icons-material/Link'

// COMPONENTES
import FormMultipleOptions from './components/multipleOption'
import MultipleInput from './components/multipleInput'
import Geolocation from './components/geolocation'
import SectionText from './components/sectionText'
import ProductSlider from './components/products'
import DatePicker from './components/datePicker'
import TextInput from './components/textInput'
import FormMedia from './components/media'
import Coupon from './components/coupon'

// OBTENER COMPONENTE
export const getComponentIcon = (name: string): JSX.Element => {
	switch (name) {
		case 'short':
			return <ShortTextOutlined />
		case 'long':
			return <SubjectOutlined />
		case 'radios':
			return <RadioButtonCheckedOutlined />
		case 'checkboxes':
			return <CheckBoxOutlined />
		case 'select':
			return <ArrowDropDownCircleOutlined />
		case 'date':
			return <EventOutlined />
		case 'link':
			return <Link />
		case 'title':
			return <TextFields />
		case 'image':
			return <ImageOutlined />
		case 'video':
			return <SlideshowRounded />
		case 'products':
			return <ShoppingCartOutlined />
		case 'geo':
			return <RoomOutlined />
		case 'coupons':
			return <ConfirmationNumberOutlined />
		case 'multiple':
			return <PersonOutlineOutlinedIcon />
		default:
			return <ShortTextOutlined />
	}
}

// OBTENER COMPONENTE
export const getComponent = (name: string): JSX.Element => {
	switch (name) {
		case 'short':
			return <TextInput />
		case 'long':
			return <TextInput isLong />
		case 'radios':
			return <FormMultipleOptions InputElement={Radio} />
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
		case 'products':
			return <ProductSlider />
		case 'coupons':
			return <Coupon />
		case 'multiple':
			return <MultipleInput />
		default:
			return <TextInput />
	}
}
