import React, { useState } from 'react'
import { useDispatch, } from 'react-redux';
import { createGlucose, fetchGlucose } from '../../store/session';

import { useModal } from "../../context/Modal";

import "./AddGlucoseModal.css"

function AddGlucoseModal() {
  const dispatch = useDispatch();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('')
  const [level, setLevel] = useState('')
  const [notes, setNotes] = useState('')

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const data = await dispatch(createGlucose(
      date,
      time,
      level,
      notes
    ));

    if (data.errors) {
      console.log(data)
      setErrors(data.errors);
    } else {
      dispatch(fetchGlucose())
      closeModal()
    }
  }

  return (
    <div id='add-glucose-container'>
      <div id="add-glucose-title">Add new glucose level</div>
      <form id='add-glucose-form-container' onSubmit={handleSubmit}>
        <div id={errors.length ? 'errors-div' : 'hidden-errors'} >
          {errors.map((error, idx) => (
            <p className='p-error' key={idx}>{error}</p>
          ))}
        </div>


        <div id="addglucose-level-notes-container">

          <div id="addglucose-level-container">
            <div className='add-glucose-label'>
              Level
            </div>

            <input type="text"
              id="add-glucose-level"
              className='add-glucose-input'
              placeholder="Level"
              value={level}

              onChange={(e) => { setLevel(e.target.value) }} />
          </div>


          <div id="addglucose-state-container">
          <div className='add-glucose-label'>
              Notes
            </div>

            <input type="text"
              id="add-glucose-notes"
              className='add-glucose-input'
              placeholder="Notes"
              value={notes}
              onChange={(e) => { setNotes(e.target.value) }} />
          </div>

        </div>


        <div id="glucose-date-time-container">
          <div id="addglucose-date-container">
            <div className="add-glucose-label">Date</div>
            <input
              type='date'
              className='glucose-date-picker'
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div id="addglucose-time-container">
            <div className="add-glucose-label">Time</div>

            <input
              type="time"
              className='glucose-time-picker'
              onChange={(e) => setTime(e.target.value)}
              required />
          </div>
        </div>

        <button type="submit" id='add-glucose-button'>Submit</button>

      </form>
    </div>
  )
}

export default AddGlucoseModal