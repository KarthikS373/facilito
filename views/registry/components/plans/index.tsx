import React from 'react'

import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import useStrings from 'hooks/lang'

import Styles from './style.module.scss'
import Box from '@mui/system/Box'

interface PlansProps {
	nextStep: EmptyFunction
	setBusinessData: SetState<Business>
}
const Plans: React.FC<PlansProps> = ({ nextStep, setBusinessData }) => {
	const { $ } = useStrings()

	const setCustomPlan = (subscription: Subscription) => () => {
		setBusinessData((business) => ({ ...business, subscription }))
		nextStep()
	}

	return (
		<div className={Styles.container}>
			<Paper className={Styles.plan}>
				<Box className={Styles.header} sx={{ bgcolor: 'primary.main', color: 'white' }}>
					<h1>{$`Plan Básico`}</h1>
					<p>{$`Ideal si estás empezando`}</p>
				</Box>

				<div className={Styles.content}>
					<ul>
						<li>
							<b>{$`Q99 / mes`}</b>
						</li>
						<li>{$`35 Productos`}</li>
						<li>{$`1 Tienda`}</li>
						<li>{$`Eventos`}</li>
					</ul>
					<Button
						onClick={setCustomPlan({
							plan: 'Plan Básico',
							price: '99',
							duration: 30,
						})}
						fullWidth
						variant='contained'
						color='primary'>{$`Seleccionar plan`}</Button>
				</div>
			</Paper>
			<Paper className={Styles.plan}>
				<Box className={Styles.header} sx={{ bgcolor: 'secondary.main', color: 'white' }}>
					<h1>{$`Plan Pro`}</h1>
					<p>{$`El favorito de las PYMES.`}</p>
				</Box>
				<div className={Styles.content}>
					<ul>
						<li>
							<b>{$`Q199 / mes`}</b>
						</li>
						<li>{$`Productos Ilimitados`}</li>
						<li>{$`Multi Tiendas`}</li>
						<li>{$`Order Tracking`}</li>
						<li>{$`Cupones`}</li>
						<li>{$`Calendario`}</li>
					</ul>
					<Button
						onClick={setCustomPlan({
							plan: 'Plan Pro',
							price: '199',
							duration: 30,
						})}
						fullWidth
						variant='contained'
						color='secondary'>{$`Seleccionar plan`}</Button>
				</div>
			</Paper>
			<Paper className={Styles.plan}>
				<Box className={Styles.header} sx={{ bgcolor: 'primary.main', color: 'white' }}>
					<h1>{$`Plan Custom`}</h1>
					<p>{$`Precios ajustables.`}</p>
				</Box>
				<div className={Styles.content}>
					<ul>
						<li>
							<b>{$`Negociable`}</b>
						</li>
						<li>{$`Multi Tiendas`}</li>
						<li>{$`Todas las funciones`}</li>
						<li>{$`Espacio adicional`}</li>
					</ul>
					<Button
						onClick={setCustomPlan({
							plan: 'Plan Custom',
							price: '199',
							duration: 30,
						})}
						fullWidth
						variant='contained'
						color='primary'>{$`Seleccionar plan`}</Button>
				</div>
			</Paper>
		</div>
	)
}

export default Plans
