// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONS
import ShoppingCartTwoTone from '@material-ui/icons/ShoppingCartTwoTone'
import DescriptionTwoTone from '@material-ui/icons/DescriptionTwoTone'
import ComputerTwoTone from '@material-ui/icons/ComputerTwoTone'
import TodayTwoTone from '@material-ui/icons/TodayTwoTone'
import InfoTwoTone from '@material-ui/icons/InfoTwoTone'

// MATERIAL
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

// HOC
import withStrings from 'hoc/lang'

// NEXT
import Image from 'next/image'

const SideBar: React.FC = withStrings(({ $ }) => {
	return (
		<div className={Styles.container}>
			<div className={Styles.brand}>
				<div className={Styles.logo}>
					<div className={Styles.icon}>
						<Image src='/assets/brand/icon.png' alt='Icon' height={45} width={45} />
					</div>
					<div>
						<h1>{$`Facilito©`}</h1>
						<p>{$`Todos los derechos reservados 2021`}</p>
					</div>
				</div>
				<IconButton color='inherit' aria-label='info'>
					<InfoTwoTone />
				</IconButton>
			</div>
			<ul>
				<li>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<DescriptionTwoTone />}>{$`Formularios`}</Button>
				</li>
				<li>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<ComputerTwoTone />}>{$`Order Tracking`}</Button>
				</li>
				<li>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<ShoppingCartTwoTone />}>{$`Productos`}</Button>
				</li>
				<li>
					<Button fullWidth variant='outlined' startIcon={<TodayTwoTone />}>{$`Calendario`}</Button>
				</li>
			</ul>
		</div>
	)
})

export default SideBar
