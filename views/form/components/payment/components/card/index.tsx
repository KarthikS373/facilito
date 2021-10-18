/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React, { useState } from 'react'

// COMPONENTES
import ReCAPTCHA from 'react-google-recaptcha'
import Cards from 'react-credit-cards'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ICONOS
import CreditCard from '@mui/icons-material/CreditCard'
import Person from '@mui/icons-material/Person'
import Lock from '@mui/icons-material/Lock'

// STYLES
import Styles from './style.module.scss'

// HOOKS
import useStrings from 'hooks/lang'
import useSendData, { useExternalCSS } from './hooks'

// TOOLS
import { handleExpiry, handleInputChange, handleInputFocus } from './tools'
import defaultCardData from './utils/initials'

export interface CardData {
	cvc: string
	expiry: string
	focus: string
	name: string
	number: string
}

// PROPS
interface CardFormProps {
	amount: string
	onChange: (data: CardPointeData, captchaToken: string | null) => unknown
}

const CardForm: React.FC<CardFormProps> = ({ amount, onChange }) => {
	// STRINGS
	const { $ } = useStrings()

	// TOKEN DE CAPTCHA
	const [captchaToken, setCaptchaToken] = useState<string | null>(null)

	// FECHA DE EXPIRACION
	const [expiry, setExpiry] = useState<string[]>(['', ''])

	// DATOS DE TARJETA
	const [state, setState] = useState<CardData>(defaultCardData)

	// FOCUS EN INPUT
	const handleInputFocusEv = (optName?: string) => (ev: React.FocusEvent<HTMLInputElement>) =>
		handleInputFocus(ev, setState, optName)

	// CAMBIAR INPUT
	const handleInputChangeEv = (ev: React.ChangeEvent<HTMLInputElement>) =>
		handleInputChange(ev, setState)

	// INPUT DE FECHA
	const handleExpiryEv = (isMonth: boolean) => (ev: React.ChangeEvent<HTMLInputElement>) =>
		handleExpiry(ev, isMonth, setExpiry, setState)

	// ENVIAR DATOS
	useSendData(state, captchaToken, amount, onChange)

	// AGREGAR CSS
	useExternalCSS('/styles/card.css', 'card-component-style')

	return (
		<div>
			<div className={Styles.container}>
				<div className={Styles.cardContainer}>
					<Cards
						cvc={state.cvc}
						expiry={state.expiry}
						// @ts-ignore
						focused={state.focus}
						name={state.name}
						number={state.number}
					/>
					<div className={Styles.captcha}>
						<ReCAPTCHA
							sitekey='6Ld-on8aAAAAAIlp_lmkZpEU7Bj0DKMeKOtY2oNU'
							onChange={setCaptchaToken}
						/>
					</div>
				</div>

				<form>
					<TextField
						fullWidth
						variant='outlined'
						type='text'
						name='name'
						label={$`Titular de tarjeta`}
						placeholder='John Doe'
						onChange={handleInputChangeEv}
						onFocus={handleInputFocusEv()}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Person color='primary' />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						fullWidth
						variant='outlined'
						type='number'
						name='number'
						value={state.number}
						label={$`Numero de tarjeta`}
						placeholder='4988 4388 4388 4305'
						onChange={handleInputChangeEv}
						onFocus={handleInputFocusEv()}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<CreditCard color='primary' />
								</InputAdornment>
							),
						}}
					/>
					<div className={Styles.security}>
						<TextField
							fullWidth
							variant='outlined'
							type='number'
							name='month'
							value={expiry[0]}
							onChange={handleExpiryEv(true)}
							onFocus={handleInputFocusEv('expiry')}
							label={$`Mes`}
							placeholder='MM'
						/>
						<TextField
							fullWidth
							variant='outlined'
							type='number'
							value={expiry[1]}
							onChange={handleExpiryEv(false)}
							name='year'
							onFocus={handleInputFocusEv('expiry')}
							label={$`Año`}
							placeholder='YY'
						/>
						<TextField
							fullWidth
							variant='outlined'
							type='number'
							name='cvc'
							label={$`CVV2`}
							placeholder='123'
							defaultValue=''
							value={state.cvc}
							onChange={handleInputChangeEv}
							onFocus={handleInputFocusEv()}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<Lock color='primary' />
									</InputAdornment>
								),
							}}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CardForm
