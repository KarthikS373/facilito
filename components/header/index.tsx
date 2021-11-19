// REACT
import React, { useContext } from 'react'

// NEXT
import Image from 'next/image'

// COMPONENTES
import ColorButton from 'components/button'
import Link from 'components/link'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Button from '@mui/material/Button'

// ICON
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone'
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone'

// HOC
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

// PROPS
interface HeaderProps {
	customDescription?: string
}

const Header: React.FC<HeaderProps> = ({ children, customDescription }) => {
	// STRINGS
	const { $ } = useStrings()

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
					<Image
						unoptimized
						layout='fill'
						alt='Background'
						src={businessCtx.business.backgroundImage || ''}
					/>
				)}
			</div>

			<div className={Styles.content}>
				{/* NEGOCIO */}
				<div className={Styles.businessContainer}>
					<div className={Styles.businessPic}>
						{businessCtx.business?.picture && (
							<Image
								unoptimized
								alt='Business'
								src={businessCtx.business?.picture}
								height={150}
								width={150}
							/>
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
								<span>{businessCtx.business?.subscription?.plan || $`Plan basico`}</span>
							</div>
							<span>
								{customDescription ||
									`${businessCtx.business?.forms?.length || 0} ${$`formulario(s) creados`}`}
							</span>
						</div>
					</div>
				</div>

				{/* ACCIONES */}
				<div className={Styles.actions}>
					<a
						target='_blank'
						style={{ borderRadius: 'var(--radius)' }}
						title={businessCtx.business?.url ?? ''}
						href={`https://facilito-dev.web.app/e/${businessCtx.business?.url}`}>
						<Button
							fullWidth
							variant='outlined'
							startIcon={<VisibilityTwoTone />}>{$`Ver como visitante`}</Button>
					</a>
					{children || (
						<Link rKey='forms' passHref>
							<ColorButton
								fullWidth
								color='primary'
								variant='contained'
								$style={{ color: '#fff', background: 'var(--primary)' }}
								startIcon={<DescriptionTwoTone />}>{$`Ir a formularios`}</ColorButton>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
