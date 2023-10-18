import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAppointments } from '../../store/session';
import { fetchAllProviders } from '../../store/providers';
import AddNewApptModal from '../AddNewApptModal/AddNewApptModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import EditApptModal from '../EditApptModal/EditApptModal';
import Calendar from '../Calendar/Calendar';
import './Appointments.css';
// import { format } from 'date-fns';


function Appointments() {
  const dispatch = useDispatch();
  const userAppointmentsData = useSelector(state => state.session.appointments);






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
          {userAppointmentsData?.length > 0 && userAppointmentsData?.map((a, key) => (
            <div key={key} className="a-card-container">
              <p className='a-provider'>{a?.provider.name}</p>
              <p className='a-specialty'>{a?.provider.specialty}</p>
              <p className='a-phone'>({a?.provider.phone.slice(0, 3)}) {a?.provider.phone.slice(3, 6)}-{a?.provider.phone.slice(6, 10)}</p>
              <p className='a-date'>{a?.date.slice(5, 7)}/{a?.date.slice(8, 10)}/{a?.date.slice(0, 4)}</p>
              <p className='a-time'>{a?.time}</p>
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
          ))}
          <OpenModalButton className='a-card-container new-appt-button' modalComponent={<AddNewApptModal />} buttonText="Add new appointment" />
            
        </div>


      </div>

    </div>
  )
}

export default Appointments