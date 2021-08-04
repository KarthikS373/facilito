// REACT
import React, { useContext } from 'react'

// RUTAS
import ROUTES, { RoutesProps } from 'router/routes'

// NEXT
import Link, { LinkProps } from 'next/link'

// CONTEXTO
import BusinessContext from 'context/business'

interface RouterLinkProps extends Omit<LinkProps, 'href'> {
	id?: string
	rKey: keyof RoutesProps
}
const RouterLink: React.FC<RouterLinkProps> = (props) => {
	// NEGOCIO
	const businessCtx = useContext(BusinessContext)

	// QUITAR PROPS HEREDADAS
	const linkProps = { ...props }
	delete linkProps.id
	delete linkProps.rKey

	return (
		<Link
			{...linkProps}
			href={ROUTES[props.rKey]
				.replace(':formID', props.id || '')
				.replace(':formURL', props.id || '')
				.replace(':productID', props.id || '')
				.replace(':companyID', businessCtx.business?.id || '')}>
			{props.children}
		</Link>
	)
}

export default RouterLink
