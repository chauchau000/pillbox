import React, { useState, useEffect, useRef } from 'react'
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
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { closeModal } = useModal();

  const autoCompleteRef = useRef();
  const inputRef = useRef()

  const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "name"]
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  }, []);

  const validatePhoneNumber = (input) => {
    const pattern = /^\d{3}-\d{3}-\d{4}$/;
    if (pattern.test(input)) {
      return true
    } else {
      return false
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.keys(errors).length) {
      return
    }
    // console.log(typeof(phoneData))

    const provider = {
      name,
      address,
      city,
      state,
      specialty,
      phone
    }

    await dispatch(createProvider(provider));

    await dispatch(fetchAllProviders())
    setErrors({})
    setHasSubmitted(false);
    closeModal()

  }

  useEffect(() => {
    const errors = {};
    if (!name.length) errors.name = "Provider name is required";
    if (!address.length) errors.address = "Address is required";
    if (!city.length) errors.city = "City is required";
    if (!state.length) errors.state = "State is required";
    if (!specialty.length) errors.specialty = "Specialty is required";
    if (!phone.length) errors.phone = "Phone is required";
    if (!validatePhoneNumber(phone)) errors.formatphone = "Please use the format xxx-xxx-xxxx"

    setErrors(errors)


  }, [name, address, city, state, specialty, phone])

  return (
    <div id='add-provider-container'>
      <div id="add-provider-title">Add Provider</div>

      <form id="add-provider-form-container" onSubmit={handleSubmit}>
        <div id="addprovider-name-container">
          <div className='add-provider-label'>
            Name
          </div>

          <input type="text"
            id="add-provider-name"
            className='add-provider-input'
            placeholder="Name"
            value={name}
            onChange={(e) => { setName(e.target.value) }} 
            ref={inputRef}
            />

          {hasSubmitted && errors.name && <p className='errors'>{errors.name}</p>}

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

          {hasSubmitted && errors.address && <p className='errors'>{errors.address}</p>}

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

            {hasSubmitted && errors.city && <p className='errors'>{errors.city}</p>}

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

            {hasSubmitted && errors.state && <p className='errors'>{errors.state}</p>}

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

              onChange={(e) => setPhone(e.target.value)} />

            <div id="format-phone">Format: xxx-xxx-xxxx</div>

            {hasSubmitted && errors.phone && <p className='errors'>{errors.phone}</p>}
            {hasSubmitted && errors.formatphone && <p className='errors'>{errors.formatphone}</p>}

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

            {hasSubmitted && errors.specialty && <p className='errors'>{errors.specialty}</p>}

          </div>
        </div>
        <button type="submit" id='add-provider-button'>Submit</button>

      </form>

    </div>
  )
}

export default AddProvider