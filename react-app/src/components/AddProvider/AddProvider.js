import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createProvider, fetchAllProviders } from '../../store/providers';

import './AddProvider.css'

function AddProvider() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();






  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhone(phone.split('-').join(''));

    const provider = {
      name,
      address,
      city,
      state,
      specialty,
      phone
    }

    const data = await dispatch(createProvider(provider));
    // console.log(newMed)
    if (data.errors) {
      setErrors(data.errors);
    } else {
      dispatch(fetchAllProviders())
      closeModal()
    }
  }


  return (
    <div id='add-provider-container'>
      <div id="add-provider-title">Add Provider</div>

      <form id="add-provider-form-container" onSubmit={handleSubmit}>

        <div id={errors.length ? 'errors-div' : 'hidden-errors'} >
          {errors.map((error, idx) => (
            <p className='p-error' key={idx}>{error}</p>
          ))}
        </div>
        <div id="addprovider-name-container">
          <div className='add-provider-label'>
            Name
          </div>

          <input type="text"
            id="add-provider-name"
            className='add-provider-input'
            placeholder="Name"
            value={name}
            onChange={(e) => { setName(e.target.value) }} />
        </div>

        <div id="addprovider-address-container">
          <div className='add-provider-label'>
            Address
          </div>

          <input type="text"
            id="add-provider-address"
            className='add-provider-input'
            placeholder="Address"
            value={address}

            onChange={(e) => { setAddress(e.target.value) }} />
        </div>

        <div id="addprovider-state-city-container">

          <div id="addprovider-city-container">
            <div className='add-provider-label'>
              City
            </div>

            <input type="text"
              id="add-provider-city"
              className='add-provider-input'
              placeholder="City"
              value={city}

              onChange={(e) => { setCity(e.target.value) }} />
          </div>


          <div id="addprovider-state-container">
            <div className='add-provider-label'>
              State
            </div>

            <input type="text"
              id="add-provider-state"
              className='add-provider-input'
              placeholder="State"
              value={state}
              onChange={(e) => { setState(e.target.value) }} />
          </div>

        </div>
        <div id="addprovider-phone-specialty-container">

          <div id="addprovider-phone-container">
            <div className='add-provider-label'>
              Phone number
            </div>

            <input type="tel"
              id="add-provider-phone"
              className='add-provider-input'
              placeholder="Phone"
              value={phone}

              onChange={(e) => { setPhone(e.target.value) }} />

              <div id="format-phone">Format: xxx-xxx-xxxx</div>
          </div>

          <div id="addprovider-specialty-container">
            <div className='add-provider-label'>
              Specialty
            </div>

            <input type="text"
              id="add-provider-specialty"
              className='add-provider-input'
              placeholder="Specialty"
              value={specialty}
              onChange={(e) => { setSpecialty(e.target.value) }} />
          </div>
        </div>
        <button type="submit" id='add-provider-button'>Submit</button>

      </form>

    </div>
  )
}

export default AddProvider