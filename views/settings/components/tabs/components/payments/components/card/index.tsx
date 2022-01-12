import React from 'react'

// NEXT
import Image from 'next/image'

// HOOKS
import getCardType from './utils/cardCodes'
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'
import { useTheme } from '@mui/material/styles'

// MATERIAL
import IconButton from '@mui/material/IconButton'

// ICONOS
import StarRateTwoTone from '@mui/icons-material/StarTwoTone'
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'

// PROPS
interface CardProps {
	onDelete: EmptyFunction
	onSetMain: EmptyFunction
	card: CompanyPaymentAccount
}
const Card: React.FC<CardProps> = ({ card, onDelete, onSetMain }) => {
	// STRINGS
	const { $ } = useStrings()

	// CODIGO DE TARJETA
	const paymentCode: string = getCardType(card.account)

	// COLORES
	const theme = useTheme()

	return (
		<div className={Styles.container}>
			<div className={Styles.content}>
				<Image
					width={45}
					height={40}
					unoptimized
					alt={paymentCode}
					src={`https://www.merchantequip.com/image/?bgcolor=FFFFFF&logos=${paymentCode}&height=64`}
				/>

				<div>
					<strong style={{ color: theme.palette.primary.main }}>{card.name}</strong>
					<p className={Styles.cardNumber}>{card.account}</p>
				</div>

				{card.main && <span className={Styles.mainBadge}>{$`Principal`}</span>}
			</div>
			<div className={Styles.actions}>
				{card.main && (
					<span className={`${Styles.mainBadge} ${Styles.actionsBadge}`}>{$`Principal`}</span>
				)}
				<IconButton onClick={onDelete}>
					<DeleteTwoTone />
				</IconButton>
				<IconButton onClick={onSetMain}>
					<StarRateTwoTone />
				</IconButton>
			</div>
		</div>
	)
}

export default Card
