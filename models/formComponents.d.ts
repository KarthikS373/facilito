/* eslint-disable camelcase */
interface FormComponent {
	background: string
	required: boolean
	color: string
	name: string
	id: number
}

interface BlockComponent extends FormComponent {
	[index: keyof BlockComponent]: typeof FormComponent[keyof FormComponent]
	daysOfWeek?: boolean[]
	time?: (Date | null)[]
	reservations?: number
	products?: string[]
	switch_1?: boolean
	switch_2?: boolean
	coupons?: Coupon[]
	duration?: number
	values?: string[]
	helper: string
	label: string
	href?: string
	text: string
	src?: string
	alt?: string
}
