import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'


import { fetchUserAppointments, fetchUserProviders } from '../../store/session'
import './Appointments.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2023,9,1),
    end: new Date(2023,10,2)
  },
  {
    title: 'Vacation',
    allDay: true,
    start: new Date(2023,10,1),
    end: new Date(2023,10,2)
  },
  {
    title: 'Small Meeting',
    allDay: true,
    start: new Date(2023,10,1),
    end: new Date(2023,10,2)
  },
  {
    title: 'Family Dinner',
    allDay: true,
    start: new Date(2023,10,1),
    end: new Date(2023,10,2)
  },
]



function Appointments() {
  const dispatch = useDispatch()





  useEffect(() => {
    dispatch(fetchUserProviders())
    dispatch(fetchUserAppointments())
  }, [dispatch])

  return (
    <div>
      <div>Appointments</div>
      {/* <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      /> */}


    </div>
  )
}

export default Appointments