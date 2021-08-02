// REACT
import React from 'react'
import ROUTES from 'router/routes'

// ICONOS
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import Description from '@material-ui/icons/Description'
import Event from '@material-ui/icons/Event'
import { Timeline } from '@material-ui/icons'

// ICONOS
export const drawerIcons = [
	<Description key='des_icon' />,
	<ShoppingCart key='shop_icon' />,
	<Event key='event_icon' />,
	<Timeline key='time_icon' />,
]
export const routes = [ROUTES.forms, ROUTES.products, ROUTES.calendar, ROUTES.orderTracking]
