type EmptyFunction = () => unknown
type TemplateStrBuilder = (string: TemplateStringsArray, ...values: any[]) => string
interface Window {
	Snack: (body: string) => void
	Alert: (props: AlertProps | string) => unknown
	hideAlert: () => unknown
}

type BaseEvent = { target: { name: string; value: string } }
