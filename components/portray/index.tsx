// REACT
import React, { useContext } from 'react'

// CONTEXTO
import PortrayContext, { IPortrayContext } from 'context/lang'

// UTILS
import getTextFromDict from './utils/files'

// HOC
export function withStrings<T>(Component: Portray.FC<T>) {
	// COMPONENTE
	const WithStringsComponent: React.FC<T> = (props: T) => {
		// CONTEXTO
		const ctx = useContext(PortrayContext)
		function $(key: TemplateStringsArray) {
			return getTextFromDict(key, ctx)
		}

		// RENDER
		return <Component {...props} {...ctx} $={$} />
	}

	// RENDER
	return WithStringsComponent
}

export namespace Portray {
	type Props<P> = P &
		IPortrayContext & {
			$: (key: TemplateStringsArray) => string
		}

	export type FC<P = {}> = FunctionComponent<P>

	interface FunctionComponent<P = {}> {
		(props: React.PropsWithChildren<Props<P>>, context?: any): React.ReactElement<any, any> | null
		propTypes?: React.WeakValidationMap<P>
		contextTypes?: React.ValidationMap<any>
		defaultProps?: Partial<P>
		displayName?: string
	}
}

// EXPORTAR
export default Portray
