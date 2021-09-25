// REACT
import React, { useContext } from 'react'

// ICONS
import NoteAddTwoTone from '@mui/icons-material/NoteAddTwoTone'

// ROUTER
import { useRouter } from 'next/router'

// COMPONENTES
import showNewFormPrompt from '../prompt'

// ESTILOS
import Styles from './style.module.scss'

// STRINGS
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

const AddNewForm: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

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
				<svg height='76' viewBox='0 0 200 76' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<g filter='url(#filter0_d)'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M-6 53.2L11.465 39.9C26.435 26.6 61.365 0 93.8 0C126.235 0 161.165 26.6 193.6 26.6C226.035 26.6 260.965 0 293.4 1.9C325.835 3.8 360.765 34.2 393.2 47.5C425.635 60.8 460.565 57 475.535 55.1L493 53.2V76H475.535C460.565 76 425.635 76 393.2 76C360.765 76 325.835 76 293.4 76C260.965 76 226.035 76 193.6 76C161.165 76 126.235 76 93.8 76C61.365 76 26.435 76 11.465 76H-6V53.2Z'
							fill='#511F73'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M-6 53.2L11.465 39.9C26.435 26.6 61.365 0 93.8 0C126.235 0 161.165 26.6 193.6 26.6C226.035 26.6 260.965 0 293.4 1.9C325.835 3.8 360.765 34.2 393.2 47.5C425.635 60.8 460.565 57 475.535 55.1L493 53.2V76H475.535C460.565 76 425.635 76 393.2 76C360.765 76 325.835 76 293.4 76C260.965 76 226.035 76 193.6 76C161.165 76 126.235 76 93.8 76C61.365 76 26.435 76 11.465 76H-6V53.2Z'
							stroke='#511F73'
						/>
					</g>
					<defs>
						<filter
							id='filter0_d'
							x='-10'
							y='0'
							height='84'
							filterUnits='userSpaceOnUse'
							colorInterpolationFilters='sRGB'>
							<feFlood floodOpacity='0' result='BackgroundImageFix' />
							<feColorMatrix
								in='SourceAlpha'
								type='matrix'
								values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							/>
							<feOffset dy='4' />
							<feGaussianBlur stdDeviation='2' />
							<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
							<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow' />
							<feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
						</filter>
					</defs>
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
