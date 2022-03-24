interface SelectBusinessFormProps {
	isNewCompany: boolean
	selectedBusiness: Business | null
	changeForm: (isNew: boolean) => (ev: React.MouseEvent) => unknown
	setSelectedBusiness: React.Dispatch<React.SetStateAction<Business | null>>
}
