import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAppointments } from '../../store/session';
import { fetchAllProviders } from '../../store/providers';
import AddNewApptModal from '../AddNewApptModal/AddNewApptModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import EditApptModal from '../EditApptModal/EditApptModal';
import Calendar from '../Calendar/Calendar';
import { format } from 'date-fns'

import './Appointments.css';
// import { format } from 'date-fns';


function Appointments() {
  const dispatch = useDispatch();
  const userAppointmentsData = useSelector(state => state.session.appointments);

  const apptArray = userAppointmentsData?.map((a) => {
    return {
      ...a,
      dateObj: new Date(a.date + "T" + a.time)
    }
  })




  useEffect(() => {
    dispatch(fetchAllProviders());
    dispatch(fetchUserAppointments());
  }, [dispatch])

  return (
    <div id='appointments-page-container'>
      <div id="calendar-placeholder">
        <Calendar />
        {/* <div id="calendar-text">Calendar feature coming soon ...</div> */}
      </div>

      <div id="appointments-container">
        <div id="appointments-grid-container">
          {apptArray?.length > 0 ? apptArray?.map((a, key) => (
            <div key={key} className="a-card-container">
              <p className='a-provider'>{a?.provider.name}</p>
              <p className='a-specialty'>{a?.provider.specialty}</p>
              <p className='a-phone'>({a?.provider.phone.slice(0, 3)}) {a?.provider.phone.slice(3, 6)}-{a?.provider.phone.slice(6, 10)}</p>
              <p className='a-date'>{format(a.dateObj, "M/d/yy")}</p>
              <p className='a-time'>{format(a.dateObj, "h:mm aa")}</p>
              <div className="appt-edit-delete-container">
                <OpenModalButton modalComponent={<EditApptModal appt={a} />}
                  buttonHTML={<span className="material-symbols-outlined">edit</span>}
                  className='appt-edit'
                />
                <OpenModalButton modalComponent={<ConfirmDeleteModal id={a.id} deleteItem='appt' />}
                  buttonHTML={<span className="material-symbols-outlined">close</span>}
                  className='appt-delete'
                />

              </div>
            </div>

          )) : <div className='a-card-container' id="no-appts-yet-text"> You have not added any appointments yet. Add some now! </div>}

          <OpenModalButton className='a-card-container new-appt-button' modalComponent={<AddNewApptModal />} buttonHTML={<div id='new-appt-button'>Add new appointment<span className="material-symbols-outlined add-appt-icon">add</span> </div>} />

        </div>


      </div>

    </div>
  )
}

export default Appointments