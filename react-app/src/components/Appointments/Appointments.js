import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAppointments } from '../../store/session';
import { fetchAllProviders } from '../../store/providers';
import { format } from 'date-fns';
import './Appointments.css';


function Appointments() {
  const dispatch = useDispatch();
  const userAppointmentsData = useSelector(state => state.session.appointments);

  




  useEffect(() => {
    dispatch(fetchAllProviders());
    dispatch(fetchUserAppointments());
  }, [dispatch])

  return (
    <div id='appointments-page-container'>
      <div id='appointments-welcome-text'>Welcome to your appointments page!</div>
      <div id="calendar-placeholder">
        <div id="calendar-text">Calendar feature coming soon ...</div>
      </div>

      <div id="appointments-container">
        <div id="appointments-grid-container">
          {userAppointmentsData?.length > 0 && userAppointmentsData?.map((a, key) => (
            <div key={key} className="a-card-container">
              <p className='a-provider'>{a?.provider.name}</p>
              <p className='a-specialty'>{a?.provider.specialty}</p>
              <p className='a-date'>{a?.date.slice(5,7)}/{a?.date.slice(8,10)}/{a?.date.slice(0,4)}</p>
              <p className='a-time'>{a?.time}</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default Appointments