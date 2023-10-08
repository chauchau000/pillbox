import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserAppointments, fetchUserProviders } from '../../store/session'
import './Appointments.css'

function Appointments() {

  const dispatch = useDispatch()


  useEffect( () => {
    dispatch(fetchUserProviders())
    dispatch(fetchUserAppointments())
  }, [dispatch])

  return (
    <div>Appointments</div>
  )
}

export default Appointments