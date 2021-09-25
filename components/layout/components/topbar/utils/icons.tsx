// REACT
import React from 'react'
import ROUTES from 'router/routes'

// ICONOS
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import Description from '@mui/icons-material/Description'
import Timeline from '@mui/icons-material/Timeline'
import Event from '@mui/icons-material/Event'

// ICONOS
export const drawerIcons = [
	<Description key='des_icon' />,
	<ShoppingCart key='shop_icon' />,
	<Event key='event_icon' />,
	<Timeline key='time_icon' />,
]
export const routes = [ROUTES.forms, ROUTES.products, ROUTES.calendar, ROUTES.tracking]
