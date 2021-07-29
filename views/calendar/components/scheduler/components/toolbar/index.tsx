// ESTILOS
import Styles from './style.module.scss'

// STRINGS
import withStrings from 'hoc/lang'

// MATERIAL
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

// ICONS
import ChevronRightTwoTone from '@material-ui/icons/ChevronRightTwoTone'
import ChevronLeftTwoTone from '@material-ui/icons/ChevronLeftTwoTone'
import EventTwoTone from '@material-ui/icons/EventTwoTone'

const CustomToolbar: React.FC<any> = withStrings((props) => {
  // REGRESAR
  const goToBack = () => {
    if (props.view === 'month') props.date.setMonth(props.date.getMonth() - 1)
    else if (props.view === 'week') props.date.setDate(props.date.getDate() - 7)
    else if (props.view === 'day' || props.view === 'agenda')
      props.date.setDate(props.date.getDate() - 1)
    props.onNavigate('prev')
  }

  // AVANZAR
  const goToNext = () => {
    if (props.view === 'month') props.date.setMonth(props.date.getMonth() + 1)
    else if (props.view === 'week') props.date.setDate(props.date.getDate() + 7)
    else if (props.view === 'day' || props.view === 'agenda')
      props.date.setDate(props.date.getDate() + 1)
    props.onNavigate('next')
  }

  // IR A HOY
  const goToCurrent = () => {
    const now = new Date()
    props.date.setDate(now.getDate())
    props.date.setMonth(now.getMonth())
    props.date.setYear(now.getFullYear())
    props.onNavigate('current')
  }

  const splitedLabel: string[] = props.label.split(' ')
  const w: number = process.browser ? window.innerWidth : 0

  return (
    <div className={Styles.container}>
      <div>
        {w > 500 && (
          <Button variant='outlined' onClick={goToCurrent} startIcon={<EventTwoTone />}>
            {props.$`Hoy`}
          </Button>
        )}
        {w < 500 && (
          <IconButton onClick={goToCurrent}>
            <EventTwoTone />
          </IconButton>
        )}
        <IconButton size={w < 500 ? 'small' : 'medium'} onClick={goToBack}>
          <ChevronLeftTwoTone />
        </IconButton>
        <IconButton size={w < 500 ? 'small' : 'medium'} onClick={goToNext}>
          <ChevronRightTwoTone />
        </IconButton>
      </div>
      <label>
        {(props.view === 'month' && (
          <>
            <strong>{splitedLabel[0]}</strong>
            <span>{splitedLabel[1]}</span>
          </>
        )) ||
          (props.view === 'week' && (
            <>
              <strong>{splitedLabel[0]}</strong>
              <span>{splitedLabel[1]} - </span>
              <strong>{splitedLabel[3]}</strong>
              <span>{splitedLabel[4]}</span>
            </>
          )) ||
          (props.view === 'day' && (
            <>
              <strong>{splitedLabel[0]}</strong>
              <span>{splitedLabel[2]} - </span>
              <span>{splitedLabel[1]}</span>
            </>
          )) ||
          (props.view === 'agenda' && (
            <>
              <strong>{splitedLabel[0]}</strong>
              <span>{splitedLabel[1]}</span>
              <span>{splitedLabel[2]}</span>
            </>
          ))}
      </label>
    </div>
  )
})

export default CustomToolbar
