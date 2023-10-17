import React, {useState} from 'react'
import { useDispatch, } from 'react-redux';
import { editGlucose, fetchGlucose } from '../../store/session';
import { useModal } from "../../context/Modal";

import './EditGlucoseModal.css'

function EditGlucoseModal({glucose}) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(glucose?.date);
  const [time, setTime] = useState(glucose?.time)
  const [level, setLevel] = useState(glucose?.level)
  const [notes, setNotes] = useState(glucose?.notes)

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGlucose = {
      date,
      time,
      level,
      notes
    }

  
    const data = await dispatch(editGlucose(glucose.id, newGlucose));

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
      <div id="add-glucose-title">Edit glucose level</div>
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div id="addglucose-time-container">
            <div className="add-glucose-label">Time</div>

            <input
              type="time"
              className='glucose-time-picker'
              value={time}

              onChange={(e) => setTime(e.target.value)}
              required />
          </div>
        </div>

        <button type="submit" id='add-glucose-button'>Save changes</button>

      </form>
    </div>  )
}

export default EditGlucoseModal