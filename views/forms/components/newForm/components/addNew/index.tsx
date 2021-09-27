// REACT
import React, { useContext } from 'react'

// ICONS
import NoteAddTwoTone from '@mui/icons-material/NoteAddTwoTone'

// ROUTER
import { useRouter } from 'next/router'

// COMPONENTES
import showNewFormPrompt from '../prompt'

// ESTILOS
import { useTheme } from '@mui/material/styles'
import Styles from './style.module.scss'

// STRINGS
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

const AddNewForm: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// TEMA
	const theme = useTheme()
	const secondaryColor = theme.palette.secondary.main

	// ROUTER
	const router = useRouter()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// MOSTRAR ALERTA
	const showPrompt = () => showNewFormPrompt($, businessCtx.business, router)

	return (
		<button className={Styles.btn} onClick={showPrompt}>
			<div>
				<NoteAddTwoTone color='secondary' />
				<svg id='visual' viewBox='0 0 900 600' width='900' height='600' version='1.1'>
					<path
						d='M0 514L25 519.8C50 525.7 100 537.3 150 536.5C200 535.7 250 522.3 300 521.7C350 521 400 533 450 533.2C500 533.3 550 521.7 600 520.5C650 519.3 700 528.7 750 536C800 543.3 850 548.7 875 551.3L900 554L900 601L875 601C850 601 800 601 750 601C700 601 650 601 600 601C550 601 500 601 450 601C400 601 350 601 300 601C250 601 200 601 150 601C100 601 50 601 25 601L0 601Z'
						fill={secondaryColor}
						strokeLinecap='round'
						strokeLinejoin='miter'></path>
				</svg>
				<span>
					{$`Crear`}
					<br />
					{$`Formulario`}
				</span>
			</div>
		</button>
	)
}

export default AddNewForm
