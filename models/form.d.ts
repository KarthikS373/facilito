interface Form {
	[index: string]: FormValue
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

type FormValue =
	| FormPersonalData
	| ConnectionMethods
	| FormTrackingStep[]
	| BlockComponent[]
	| 'cash'
	| 'card'
	| FormCheckout
	| FormCompany
	| string
	| boolean
	| 'es'
	| 'en'

interface FormTrackingStep {
	name: string
	color?: string
	description: string
}

interface FormCheckout {
	[index: string]: boolean | number
	shippingPrices?: ShippingPrice[]
	shippingNotIncluded: boolean
	allowSelectCategory: boolean
	registerCustomers: boolean
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
	[index: string]: ('whatsapp' | 'email')[] | number | string | undefined
	methods: ('whatsapp' | 'email')[]
	whatsapp: string
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

interface FormAnswerTracking {
	data: FormAnswerItemContainer
	date: string
	state: number
}

interface FormAnswerSelf {
	data: FormAnswerItemContainer
	date: Date
	stateIndex: number
	index: number
}

interface FormAnswerItem {
	[index: string]: string
	answer: string
	quest: string
}

interface FormAnswerItemContainer {
	[index: string]: FormAnswerItem
}

interface FormAnswerItemParsed {
	[index: string]:
		| {
				[index: string]: string
				answer: string | FormProductSliderAnswer[] | ExtraOptional[][] | Date[]
				quest: string
		  }
		| undefined
}

interface FormSortedAnswer {
	answer: FormAnswerItem
	key: string
}

interface FormData extends FormAnswerItemContainer {
	products: FormAnswerItem
	coupons: FormAnswerItem
}

interface FormSummaryData {
	shippingMethodValue: string
	payMethodValue: string
}

interface FormCheckoutData {
	shippingPrice: number
	taxesPrice: number
	totalPrice: string
	cardPrice: number
}

interface ShippingPrice {
	name: string
	price: number
}

interface OrderedAnswer {
	answer: FormAnswerItem
	key: string
}

interface FormContainerProps extends BlockComponent {
	[index: string]: typeof BlockComponent[keyof BlockComponent]
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
	onChangePersonalOptions?: (key: keyof FormPersonalData, checked: boolean) => unknown
	personalOptions?: FormPersonalData
	onDelete?: EmptyFunction
	onCopy?: EmptyFunction
	dragProps?: unknown
	active?: boolean
	formId?: string
}

interface CustomFormState {
	title: string
	banner: string
	background: string
	description: string
	url: string
}

type FormInputValue =
	| string
	| string[]
	| boolean[]
	| number
	| (Date | null)[]
	| Product[]
	| boolean
	| Coupon[]

interface FcltRequest {
	target: string
	info: {
		companyID: string
		formID: string
	}
}

interface FormComponentItemProps {
	icon: JSX.Element
	text: string
	ref?: unknown
}

interface FormInputProps extends FormContainerProps {
	onAddValue?: (props: keyof BlockComponent) => (values: string[]) => unknown
	onWrite?: (props: keyof BlockComponent) => (ev: React.ChangeEvent) => unknown
	preview?: boolean
}
