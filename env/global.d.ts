type EmptyFunction = () => unknown
type TemplateStrBuilder = (string: TemplateStringsArray, ...values: unknown[]) => string
interface Window {
	Snack: (body: string) => void
	Alert: (props: AlertProps | string) => unknown
	hideAlert: () => unknown
}

type BaseEvent = { target: { name: string; value: string } }
type SetState<T> = React.Dispatch<React.SetStateAction<T>>

declare module 'react-swipeable-views-react-18-fix' {
	import m from '@types/react-swipeable-views'
	export default m
}
