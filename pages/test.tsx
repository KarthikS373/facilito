import React, { useEffect } from 'react'
import { getProduct } from 'utils/products'
import { getStockHistory } from 'utils/stockHistory'

const TestPage = () => {
	const [data, setData] = useState([])
	useEffect(() => {
		console.clear()
		const fetch = async () => {
			const _data = await getStockHistory('weareluastudio', 'menu_pizzas')
			console.log(_data.data())

			setData(_data)

			const products = await getProduct('AM001', 'weareluastudio')
			console.log(products)
		}

		fetch()
	}, [])

	return <>{JSON.stringify(data)}</>
}

export default TestPage
