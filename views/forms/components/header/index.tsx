// REACT
import React, { useContext } from 'react'

// NEXT
import Image from 'next/image'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Button from '@material-ui/core/Button'

// ICON
import QueryBuilderTwoTone from '@material-ui/icons/QueryBuilderTwoTone'
import VisibilityTwoTone from '@material-ui/icons/VisibilityTwoTone'

// HOC
import withStrings from 'hoc/lang'

// CONTEXTO
import BusinessContext from 'context/business'

const Header: React.FC = withStrings(({ $, children }) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	return (
		<div className={Styles.container}>
			{/* FONDO */}
			<div
				className={Styles.background}
				style={{
					background:
						businessCtx.business?.backgroundImage === 'none'
							? businessCtx.business?.background
							: '',
				}}>
				{businessCtx.business && businessCtx.business.backgroundImage !== 'none' && (
					<Image src={businessCtx.business.backgroundImage} layout='fill' />
				)}
			</div>

			<div className={Styles.content}>
				{/* NEGOCIO */}
				<div className={Styles.businessContainer}>
					<div className={Styles.businessPic}>
						{businessCtx.business?.picture && (
							<Image src={businessCtx.business?.picture} height={150} width={150} />
						)}
					</div>
					<div className={Styles.businessInfo}>
						<div>
							<span>@{businessCtx.business?.url}</span>
							<h1>{businessCtx.business?.name}</h1>
						</div>
						<div>
							<div className={Styles.businessSubs}>
								<span>{businessCtx.business?.category}</span>
								<span>{$`Plan basico`}</span>
							</div>
							<span>
								{businessCtx.business?.forms.length} {$`formulario(s) creados`}
							</span>
						</div>
					</div>
				</div>

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<Button
						fullWidth
						variant='outlined'
						startIcon={<VisibilityTwoTone />}>{$`Ver como visitiante`}</Button>
					{children}
				</div>
			</div>
		</div>
	)
})

export default Header
