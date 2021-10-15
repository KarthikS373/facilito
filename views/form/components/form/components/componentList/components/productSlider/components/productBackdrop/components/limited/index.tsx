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

// TOOLS
import computeLeft, { getTotalPrice, handleCounters } from './tools'

export interface ExtraLimitedProps {
	onSelect?: (extra: ExtraOptionalExt[] | undefined) => unknown
	extra: Extra
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

	// VARIABLES DE CONTEO
	const totalSum: number = sizes.reduce((fSize: number, lSize: number) => fSize + lSize, 0)

	// CALCULAR PRECIO TOTAL
	const totalPrice: number = getTotalPrice(props, sizes)

	// DIMENSION MAXIMA
	const maxSize: number = parseInt((props.extra.cant || 0).toString(), 10)

	// CAMBIAR CONTADOR
	const handleCountersEv = (index: number) => (cSize: number) =>
		handleCounters(index, cSize, maxSize, setSize, props)

	// RESTANTE
	const left: number = computeLeft(sizes, props.extra.cant || 0)

	return (
		<div className={Styles.optionsCant}>
			<span style={{ '--primaryColor': theme.palette.primary.main } as React.CSSProperties}>
				{left > 0
					? `${$`Te quedan`} ${left} ${$`restante`} `
					: totalPrice > 0
					? $`Total `
					: `${$`Opciones completadas`}`}
				{totalPrice > 0 ? `+${badge} ${totalPrice} ${props.extra.required ? '*' : ''}` : ''}
			</span>
			<div className={Styles.options}>
				{props.extra.options.map((exOption: ExtraOptional, optIndex: number) => (
					<div key={`extra_cant_${optIndex}`}>
						<p>
							{exOption.name} {exOption.price > 0 ? `${badge} ${exOption.price}` : `(${$`Gratis`})`}
						</p>
						<Counter
							max={totalSum === maxSize ? sizes[optIndex] : maxSize || 0}
							onChangeVal={handleCountersEv(optIndex)}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ExtraLimited
