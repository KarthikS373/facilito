interface PortrayDict {
	[id: string]: {
		[langCode: string]: string
	}
}

namespace Portray {
	type Props<P> = P & {
		langCode: string
		setLangCode(langCode: string): void
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
