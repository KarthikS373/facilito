interface Product {
	[index: string]:
		| string
		| string[]
		| number
		| boolean
		| ProductUnit
		| ProductStockOption
		| Extra[]
		| undefined
	sku: string
	title: string
	description: string
	category: string
	picture: string[]
	price: number
	promoPrice?: number
	isPromo: boolean
	unit: ProductUnit
	unitName: string
	count: number
	stockOption: ProductStockOption
	active: boolean
	featured: boolean
	extras?: Extra[]
}

type ProductUnit = 1 | 0.5 | 0.25
type ProductStockOption = 'inf' | 'lim' | 'ctn'

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

interface ExtraProductData {
	title: string
	options: ExtraOptional[]
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
	extras: ExtraOptionalExt[]
	totalPrice: number
	product: Product
	count: number
}

interface ExtraOptionalExt extends ExtraOptional {
	title: string
}

interface Coupon {
	type: 'promo' | 'discount'
	id: string
	factors?: number[]
	products?: Partial<Product>[]
	percent?: number
	count: number
	enable: boolean
}

interface FormDataCouponsAnswer {
	[id: string]: string
}

interface FormProductSliderAnswer {
	count: number
	totalPrice: number
	title: string
	picture: string
	sku: string
	stockOption: 'lim' | 'ctn' | 'inf'
	productCount: number
	category: string
}

interface FormDataProductSliderAnswer {
	[id: string]: FormProductSliderAnswer[] | ExtraProductData[][] | number
}
