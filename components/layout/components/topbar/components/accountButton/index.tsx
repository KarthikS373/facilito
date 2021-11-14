// REACT
import React, { useState, MouseEvent, useContext } from 'react'

// NEXT
import Image from 'next/image'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Button from '@mui/material/Button'

// ICONOS
import PersonTwoTone from '@mui/icons-material/PersonTwoTone'
import MoreVert from '@mui/icons-material/MoreVert'

// COMPONENTES
import AccountMenu from './components/accountMenu'

// CONTEXTOS
import UserContext from 'context/user'

const AccountButton: React.FC = () => {
	// USUARIO
	const userCtx = useContext(UserContext)

	// MENU DE CUENTA
	const [accountMenu, setAccountMenu] = useState<HTMLElement | null>(null)
	const openAccountMenu = Boolean(accountMenu)

	// CERRAR MENU DE CUENTA
	const closeAccountMenu = () => setAccountMenu(null)

	// ABRIR MENU
	const openAccountMenuEv = (ev: MouseEvent<HTMLButtonElement>) => setAccountMenu(ev.currentTarget)

	return (
		<>
			<Button
				variant='outlined'
				aria-label='account'
				onClick={openAccountMenuEv}
				className={Styles.accountBtn}
				endIcon={<MoreVert />}
				startIcon={
					<div className={Styles.accountPic}>
						{userCtx.user?.picture ? (
							<Image unoptimized src={userCtx.user?.picture} alt='UserPic' height={30} width={30} />
						) : (
							<PersonTwoTone />
						)}
					</div>
				}>
				<div className={Styles.accountBtnContent}>
					<span>{userCtx.user?.name.split(' ')[0]?.toUpperCase()}</span>
					<span>{userCtx.user?.role}</span>
				</div>
			</Button>

			{/* MENU DE CUENTA */}
			<AccountMenu onClose={closeAccountMenu} open={openAccountMenu} anchorEl={accountMenu} />
		</>
	)
}

export default AccountButton
