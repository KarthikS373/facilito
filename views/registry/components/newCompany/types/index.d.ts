interface NewCompanyFormProps {
	phone: string
	isNewCompany: boolean
	savePhoneOnBusinessDataEv: (phone: string) => unknown
	changeForm: (newCompany: boolean) => (ev: React.MouseEvent) => unknown
	saveOnBusinessDataEv: (ev: React.ChangeEvent<HTMLInputElement>) => unknown
}
