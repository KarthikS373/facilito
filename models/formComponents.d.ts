/* eslint-disable camelcase */
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
	products?: string[]
	duration?: number
	values?: string[]
	helper: string
	label: string
	href?: string
	text: string
	switch_1?: boolean
	switch_2?: boolean
	src?: string
	alt?: string
}
