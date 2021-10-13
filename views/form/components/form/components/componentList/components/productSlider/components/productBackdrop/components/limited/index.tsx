// REACT
import React, { useState, useContext } from 'react'

// MATERIAL
import { useTheme } from '@mui/material/styles'

// ESTILOS
import Styles from './style.module.scss'

// HOOKS
import useStrings from 'hooks/lang'

// CONTEXTO
import FormContext from '../../../../../../context'

// COMPONENTES
import Counter from '../counter'

interface ExtraLimitedProps {
	onSelect?: (extra: ExtraOptional[] | undefined) => unknown
	extra: Extra
}

// CALCULAR RESTANTES
const computeLeft = (sizes: number[], cant: number) => {
	// VARIABLES DE CONTEO
	const totalSum: number = sizes.reduce((fSize: number, lSize: number) => fSize + lSize, 0)
	const maxSize: number = parseInt(cant.toString(), 10)
	return maxSize - totalSum
}

const ExtraLimited: React.FC<ExtraLimitedProps> = (props: ExtraLimitedProps) => {
	// STRINGS
	const { $ } = useStrings()

	// TEMA
	const theme = useTheme()

	// DIMENSIONES
	const [sizes, setSize] = useState<number[]>([])

	// PROPS
	const { badge } = useContext(FormContext)

	// ENVIAR
	const sendExtra = (newSize: number[] | undefined) => {
		// CREAR ITEMS
		const items: ExtraOptional[] | undefined = newSize
			? props.extra.options
					.map((extraOpt: ExtraOptional, exIndex: number) => ({
						name: `${newSize[exIndex]} ${extraOpt.name}`,
						price: extraOpt.price,
					}))
					.filter((_e, exIndex: number) => newSize[exIndex] && newSize[exIndex] > 0)
			: undefined

		// ENVIAR
		if (props.onSelect) props.onSelect(items)
	}

	// VARIABLES DE CONTEO
	const totalSum: number = sizes.reduce((fSize: number, lSize: number) => fSize + lSize, 0)
	const totalPrice: number = props.extra.options
		.map((exOption: ExtraOptional, optIndex: number) => exOption.price * (sizes[optIndex] || 0))
		.reduce((fPrice, nPrice) => fPrice + nPrice, 0)

	const maxSize: number = parseInt((props.extra.cant || 0).toString(), 10)

	// CAMBIAR CONTADOR
	const handleCounters = (index: number) => (cSize: number) => {
		// ENVIAR
		setSize((sizes: number[]) => {
			// ASIGNAR
			const newSize = [...sizes]
			newSize[index] = cSize

			// CALCULAR SUMA
			const sum = newSize.reduce((fSize: number, lSize: number) => fSize + lSize, 0)

			// ENVIAR
			if (sum > 0) {
				if (props.extra.required) {
					if (computeLeft(newSize, props.extra.cant || 0) === 0) sendExtra(newSize)
					else sendExtra(undefined)
				} else sendExtra(newSize)
			} else sendExtra(undefined)

			// ACTUALIZAR ESTADO
			if (sum <= (maxSize || 0)) return newSize
			else return sizes
		})
	}

	return (
		<div className={Styles.optionsCant}>
			<span style={{ '--primaryColor': theme.palette.primary.main } as React.CSSProperties}>
				{$`Te queda`} {computeLeft(sizes, props.extra.cant || 0)}{' '}
				{totalPrice > 0 ? `+${badge} ${totalPrice} ${props.extra.required && '*'}` : ''}
			</span>
			{props.extra.options.map((exOption: ExtraOptional, optIndex: number) => (
				<div key={`extra_cant_${optIndex}`}>
					<p>
						{exOption.name} {exOption.price > 0 ? `${badge} ${exOption.price}` : `(${$`Gratis`})`}
					</p>
					<Counter
						max={totalSum === maxSize ? sizes[optIndex] : maxSize || 0}
						onChangeVal={handleCounters(optIndex)}
					/>
				</div>
			))}
		</div>
	)
}

export default ExtraLimited
