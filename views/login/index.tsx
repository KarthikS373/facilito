// REACT
import React, { useState } from 'react'

// COMPONENTES
import SigningForm from './components/signing'
import LoginForm from './components/login'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTE
const w: number = process.browser ? window.innerWidth : 0
const Login = () => {
	// ESTADO
	const [isOnLogin, setForm] = useState<boolean>(true)

	// CAMBIAR FORMULARIO
	const changeForm = (slide: boolean) => () => setForm(slide)

	return (
		<div className={Styles.container}>
			<div
				className={Styles.cover}
				style={{ transform: `translateX(${!isOnLogin ? '100%' : '0%'})` }}
			/>
			<div
				className={Styles.forms}
				style={{ transform: w <= 850 ? `translateX(${isOnLogin ? '-50%' : '0%'})` : 'none' }}>
				<SigningForm onLogin={changeForm(true)} />
				<LoginForm onSigning={changeForm(false)} />
			</div>
		</div>
	)
}

export default Login
