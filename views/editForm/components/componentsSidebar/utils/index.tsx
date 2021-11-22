// REACT
import React from 'react'

// ICONOS
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberTwoTone'
import ArrowDropDownCircle from '@mui/icons-material/ArrowDropDownCircleTwoTone'
import RadioButtonChecked from '@mui/icons-material/RadioButtonCheckedTwoTone'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartTwoTone'
import SlideshowRounded from '@mui/icons-material/SlideshowTwoTone'
import TextFields from '@mui/icons-material/TextFieldsTwoTone'
import ImageOutlined from '@mui/icons-material/ImageTwoTone'
import ShortText from '@mui/icons-material/ShortTextTwoTone'
import RoomOutlined from '@mui/icons-material/RoomTwoTone'
import CheckBox from '@mui/icons-material/CheckBoxTwoTone'
import Subject from '@mui/icons-material/SubjectTwoTone'
import Event from '@mui/icons-material/EventTwoTone'
import Link from '@mui/icons-material/LinkTwoTone'

/**
 * Obtener componentes
 * @description Obtener lista de todos los elementos
 * @param $
 * @returns
 */
export const getComponentsItems = ($: TemplateStrBuilder): FormComponentItemProps[] => {
	const componentsItems: FormComponentItemProps[] = [
		{
			icon: <ShortText />,
			text: $`Respuesta corta`,
		},
		{
			icon: <Subject />,
			text: $`Párrafo`,
		},
		{
			icon: <RadioButtonChecked />,
			text: $`Varias opciones`,
		},
		{
			icon: <CheckBox />,
			text: $`Casillas`,
		},
		{
			icon: <ArrowDropDownCircle />,
			text: $`Desplegable`,
		},
		{
			icon: <Event />,
			text: $`Fecha y Hora`,
		},
		{
			icon: <RoomOutlined />,
			text: $`Mapa`,
		},
		{
			icon: <Link />,
			text: $`Enlace`,
		},
		{
			icon: <TextFields />,
			text: $`Titulo`,
		},
		{
			icon: <ImageOutlined />,
			text: $`Imagen`,
		},
		{
			icon: <SlideshowRounded />,
			text: $`Video`,
		},
		{
			icon: <ShoppingCartOutlined />,
			text: $`Productos`,
		},

		{
			icon: <ConfirmationNumberOutlined />,
			text: $`Cupon`,
		},
	]

	return componentsItems
}
