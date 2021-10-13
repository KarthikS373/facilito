// REACT
import React, { useState } from 'react'

// MATERIAl
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

// ESTILOS
import Styles from './style.module.scss'

interface CounterProps {
	max: number
	onChangeVal?: (value: number) => unknown
}

const Counter: React.FC<CounterProps> = (props: CounterProps) => {
	const [productsCounter, setProductsCounter] = useState<number>(0)

	// AGREGAR A CONTADOR
	const handleProductCounter = (add: number) => () => {
		const added: number = Math.min(Math.max(0, productsCounter + add), props.max) || 0
		setProductsCounter(added)
		props.onChangeVal && props.onChangeVal(added)
	}

	return (
		<ButtonGroup
			className={Styles.productCounter}
			color='primary'
			aria-label='primary button group'>
			<Button variant='contained' onClick={handleProductCounter(-1)}>
				-
			</Button>
			<Button>{productsCounter}</Button>
			<Button variant='contained' onClick={handleProductCounter(1)}>
				+
			</Button>
		</ButtonGroup>
	)
}

export default Counter
