interface Product {
	sku: string
	title: string
	description: string
	category: string
	picture: string[]
	price: number
	promoPrice?: number
	isPromo: boolean
	unit: 1 | 0.5 | 0.25
	unitName: string
	count: number
	stockOption: 'inf' | 'lim' | 'ctn'
	active: boolean
	featured: boolean
	extras?: Extra[]
}

interface Extra {
	title: string
	type: ExtraType
	options: ExtraOptional[]
	required: boolean
	cant?: number
}

enum ExtraType {
	ONLY,
	MULTIPLE,
	AMOUNT,
}

interface ExtraOptional {
	name: string
	price: number
}

interface ExtendedOpt extends ExtraOptional {
	id: number
}

interface ExtendedExtra extends Extra {
	id: number
}

interface CurrentProduct {
	index: number
	product: Product
}

interface ProductSelected {
	product: Product
	count: number
	extras: ExtraOpcional[]
	totalPrice: number
}
