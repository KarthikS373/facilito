type EmptyFunction = () => unknown
type TemplateStrBuilder = (string: TemplateStringsArray, ...values: unknown[]) => string
interface Window {
	Snack: (body: string) => void
	Alert: (props: AlertProps | string) => unknown
	hideAlert: () => unknown
}

type BaseEvent = { target: { name: string; value: string } }
type SetState<T> = React.Dispatch<React.SetStateAction<T>>
