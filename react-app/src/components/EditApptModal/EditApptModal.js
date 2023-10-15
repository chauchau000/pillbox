import React, { useState, } from 'react';
import { useDispatch, } from 'react-redux';
import { editAppt, fetchUserAppointments } from '../../store/session';
import './EditApptModal.css'
import { useModal } from "../../context/Modal";


function EditApptModal({appt}) {
    const dispatch = useDispatch();

    const [date, setDate] = useState(appt.date);
    const [time, setTime] = useState(appt.time)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    //Provider Selection



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAppt = {
            date,
            time
        }

        const data = await dispatch(editAppt(appt.id, newAppt));
        // console.log(newMed)
        if (data.errors) {
            console.log(data)
            setErrors(data.errors);
        } else {
            dispatch(fetchUserAppointments())
            closeModal()
        }
    }


  return (
    <div id='edit-appt-container'>
    <div id="add-appt-title">Edit Appointment</div>

    <form id='add-appt-form-container' onSubmit={handleSubmit}>

        <div id={errors.length ? 'errors-div' : 'hidden-errors'} >
            {errors.map((error, idx) => (
                <p className='p-error' key={idx}>{error}</p>
            ))}
        </div>

        <div id="date-time-contianer">
            <div id="date-container">
                <div className="add-appt-label">Date</div>
                <input
                    type='date'
                    className='appt-date-picker'
                    value={date}
                    onChange={ (e) => setDate(e.target.value)}
                    required
                />
            </div>

            <div id="time-container">
                <div className="add-appt-label">Time</div>

                <input
                    type="time"
                    className='appt-time-picker'
                    value={time}
                    onChange={ (e) => setTime(e.target.value)}

                    required />
            </div>
        </div>

        <button type="submit" id='add-appt-button'>Save changes</button>
    </form>
    </div>
  )
}

export default EditApptModal