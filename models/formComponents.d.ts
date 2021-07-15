interface FormComponent {
	required: boolean
	background: string
	color: string
	name: string
	id: number
}

interface BlockComponent extends FormComponent {
	[index: keyof BlockComponent]: typeof FormComponent[keyof FormComponent]
	daysOfWeek?: boolean[]
	time?: (Date | null)[]
	reservations?: number
	coupons?: Coupon[]
	switch_2?: boolean
	products?: string[]
	switch_1?: boolean
	duration?: number
	values?: string[]
	helper: string
	label: string
	href?: string
	text: string
	src?: string
	alt?: string
}
