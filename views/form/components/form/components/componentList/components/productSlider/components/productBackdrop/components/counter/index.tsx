// REACT
import React, { useState } from 'react'

// MATERIAl
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

// ESTILOS
import Styles from './style.module.scss'

// TOOLS
import handleProductCounter from './tools'

interface CounterProps {
	max: number
	onChangeVal?: (value: number) => unknown
}

const Counter: React.FC<CounterProps> = ({ max, onChangeVal }: CounterProps) => {
	const [productsCounter, setProductsCounter] = useState<number>(0)

	// AGREGAR A CONTADOR
	const handleProductCounterEv = (add: number) => () =>
		handleProductCounter(add, max, setProductsCounter, onChangeVal)

	return (
		<ButtonGroup
			color='primary'
			className={Styles.productCounter}
			aria-label='primary button group'>
			<Button variant='contained' onClick={handleProductCounterEv(-1)}>
				-
			</Button>
			<Button>{productsCounter}</Button>
			<Button variant='contained' onClick={handleProductCounterEv(1)}>
				+
			</Button>
		</ButtonGroup>
	)
}

export default Counter
