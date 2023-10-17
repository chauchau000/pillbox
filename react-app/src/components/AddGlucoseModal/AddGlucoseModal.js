import React, { useState, useEffect } from 'react'
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

  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.keys(errors).length) {
      return
    }

    await dispatch(createGlucose(
      date,
      time,
      level,
      notes
    ));


    await dispatch(fetchGlucose())
    setErrors({})
    setHasSubmitted(false);
    closeModal()

  }

  useEffect(() => {
    const errors = {};
    if (!date) errors.date = "Date is required";
    if (!time) errors.time = "Time is required";
    if (!level) errors.level = "Level is required";

    setErrors(errors)
  }, [date, time, level])

  return (
    <div id='add-glucose-container'>
      <div id="add-glucose-title">Add new glucose level</div>
      <form id='add-glucose-form-container' onSubmit={handleSubmit}>

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

            {hasSubmitted && errors.level && <p className='errors'>{errors.level}</p>}

          </div>


          <div id="addglucose-state-container">
            <div className='add-glucose-label'>
              Notes (optional)
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
            />
            {hasSubmitted && errors.date && <p className='errors'>{errors.date}</p>}

          </div>

          <div id="addglucose-time-container">
            <div className="add-glucose-label">Time</div>

            <input
              type="time"
              className='glucose-time-picker'
              onChange={(e) => setTime(e.target.value)}
            />

            {hasSubmitted && errors.time && <p className='errors'>{errors.time}</p>}

          </div>
        </div>

        <button type="submit" id='add-glucose-button'>Submit</button>

      </form>
    </div>
  )
}

export default AddGlucoseModal