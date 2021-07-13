// ALERTAS
import withAlerts from '@weareluastudio/lualert'

const AlertsProvider: React.FC = (props) => {
	return <>{props.children}</>
}

// EXPORT
const withAlertsC = withAlerts()(AlertsProvider)
export default withAlertsC
