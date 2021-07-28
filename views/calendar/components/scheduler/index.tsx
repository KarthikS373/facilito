// REACT
import React from 'react'

// CALENDAR
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'

// MATERIAL
import Paper from '@material-ui/core/Paper'

// STRINGS
import withStrings from 'hoc/lang'

// COMPONENTES
import CustomToolbar from './components/toolbar'

// ESTILOS
import Styles from './style.module.scss'

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
    return (
      <Paper className={Styles.container}>
        <Calendar
          view={viewState}
          defaultView='week'
          endAccessor='end'
          culture={langCode}
          startAccessor='start'
          events={appointments}
          localizer={localizer}
          style={{ height: 500 }}
          components={{ toolbar: CustomToolbar }}
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
