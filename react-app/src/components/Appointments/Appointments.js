import React, { useEffect } from 'react'
import { useDispatch,  } from 'react-redux'


import { fetchUserAppointments, fetchUserProviders } from '../../store/session'
import './Appointments.css'



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