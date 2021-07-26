interface Form {
	includePersonalData: FormPersonalData
	answersConnection?: ConnectionMethods
	tracking?: FormTrackingStep[]
	components: BlockComponent[]
	payMethod?: 'cash' | 'card'
	checkout?: FormCheckout
	company: FormCompany
	description: string
	background: string
	lang: 'es' | 'en'
	public: boolean
	banner: string
	title: string
	fclt?: string
	badge: string
	url: string
	qr: string
	id: string
}

interface FormTrackingStep {
	name: string
	color?: string
}

interface FormCheckout {
	[index: string]: boolean | number
	shippingPrices?: ShippingPrice[]
	shippingNotIncluded: boolean
	allowSelectCategory: boolean
	taxesNotIncluded: boolean
	minimumPurchase: number
	taxesPercentage: number
	cardPercentage: number
	showcaseMode: boolean
	noEmptyCart: boolean
	showSearch: boolean
}

interface FormPersonalData {
	[index: keyof FormPersonalData]: boolean
	instructions: boolean
	address: boolean
	phone: boolean
	email: boolean
}

interface ConnectionMethods {
	[index: string]: ('whatsapp' | 'email')[] | number | string
	methods: ('whatsapp' | 'email')[]
	whatsapp: number
	email: string
}

interface FormCompany {
	url: string
	user: string
}

interface FormNotification {
	title: string
	body: string
}

interface FormInterface {
	forms: Form[]
	answers: (FormAnswer | undefined)[]
}

interface FormAnswer {
	data: FormAnswerItemContainer[]
	dates: Date[]
	states: number[]
}

interface FormAnswerSelf {
	data: FormAnswerItemContainer
	date: Date
	state: string
	index: number
}

interface FormAnswerItem {
	[index: string]: FormInputValue
	answer: FormInputValue
	quest: string
}

interface FormAnswerItemContainer {
	[index: string]: FormAnswerItem
}

interface FormSortedAnswer {
	answer: FormAnswerItem
	key: string
}
