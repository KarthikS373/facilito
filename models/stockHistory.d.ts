interface StockHistoryData {
	product: {
		name: string
		sku: string
	}
	inputs: number
	outputs: number
	customer: {
		name: string
		email: string
	}
}

interface FormStockHistory {
	data: StockHistoryData[]
	dates: Date[]
}

interface StockHistorySelf {
	[index: string]: FormStockHistory | string | date
	data: StockHistoryData
	formId: string
	date: Date
}
