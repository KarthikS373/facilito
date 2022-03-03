import { UserRole } from '../components/tabs/components/users/tools'
import { createContext, Context } from 'react'

export interface GeneralProps {
	businessRef: React.MutableRefObject<Business | null>
	backgroundRef: React.MutableRefObject<File | string>
	bannerRef: React.MutableRefObject<File | string>
	userRoles: React.MutableRefObject<UserRole[]>
	setCustomBackground: SetState<string | undefined>
}

// VALOR POR DEFECTO
const DefContext: GeneralProps = {
	businessRef: { current: null },
	backgroundRef: { current: '' },
	bannerRef: { current: '' },
	userRoles: { current: [] },
	setCustomBackground: () => null,
}

// CONTEXTO
const SettingsContext: Context<GeneralProps> = createContext(DefContext)

export default SettingsContext
