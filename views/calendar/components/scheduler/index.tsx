// REACT
import React, { useState, useContext } from 'react'

// CALENDAR
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'

// MATERIAL
import Paper from '@material-ui/core/Paper'

// STRINGS
import withStrings from 'hoc/lang'

// COMPONENTES
import CustomEvent, { showEventInfo } from './components/event'
import CustomToolbar from './components/toolbar'

// HOOKS
import { useCalendarView } from '../../utils/hooks'

// ESTILOS
import Styles from './style.module.scss'

// CONTEXTO
import BusinessContext from 'context/business'

// FNS
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import format from 'date-fns/format'
import es from 'date-fns/locale/es'
import parse from 'date-fns/parse'

// CSS
import 'react-big-calendar/lib/css/react-big-calendar.css'

// LOCALIZER
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { es },
})

// PROPS
interface SchedulerProps {
  viewState: string
  appointments: CustomAppointment[]
}
const Scheduler: React.FC<SchedulerProps> = withStrings(
  ({ appointments, $, viewState, langCode }) => {
    // NEGOCIO
    const businessCtx = useContext(BusinessContext)

    // ESTADO
    const [newViewState, setViewState] = useState<string>()

    // CAMBIAR
    useCalendarView(viewState, setViewState)

    return (
      <Paper
        className={
          (newViewState === 'week' && Styles.weekContainer) ||
          (newViewState === 'month' && Styles.monthContainer) ||
          (newViewState === 'day' && Styles.dayContainer) ||
          (newViewState === 'agenda' && Styles.agendaContainer)
        }>
        <Calendar
          defaultView='week'
          endAccessor='end'
          culture={langCode}
          view={newViewState}
          startAccessor='start'
          events={appointments}
          localizer={localizer}
          style={{ height: 500 }}
          onSelectEvent={showEventInfo($, businessCtx.business)}
          components={{ toolbar: CustomToolbar, event: CustomEvent }}
          messages={{
            noEventsInRange: $`Sin eventos en este periodo`,
            work_week: $`Semana de trabajo`,
            allDay: $`Todo el día`,
            tomorrow: $`Mañana`,
            yesterday: $`Ayer`,
            previous: $`Atras`,
            next: $`Siguiente`,
            agenda: $`Agenda`,
            time: $`Tiempo`,
            week: $`Semana`,
            date: $`Fecha`,
            today: $`Hoy`,
            month: $`Mes`,
            day: $`Día`,
          }}
        />
      </Paper>
    )
  }
)

export default Scheduler
