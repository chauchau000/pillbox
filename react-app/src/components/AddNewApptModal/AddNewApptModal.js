import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAppt, fetchUserAppointments } from '../../store/session';

import { useModal } from "../../context/Modal";
import './AddNewApptModal.css';

function AddNewApptModal() {
    const dispatch = useDispatch();
    const allProvidersData = useSelector(state => state.providers)
    const allProviders = Object.values(allProvidersData).map(p => p.name).sort() // array of provider names

    const [provider, setProvider] = useState("");
    const [provider_id, setProviderId] = useState(0);

    const [date, setDate] = useState('');
    const [time, setTime] = useState('')
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const { closeModal } = useModal();


    //Provider Selection
    const [filteredProviders, setFilteredProviders] = useState([...allProviders])
    const [providerResults, setProviderResults] = useState(false)
    const providerRef = useRef(null);

    const closeProviderSearch = () => setProviderResults(false);

    const handleProviderFilter = (event) => {
        let searchWord = event.target.value;
        const newFilter = allProviders.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === '') {
            setFilteredProviders([...allProviders])
        } else {
            setFilteredProviders(newFilter)
        }
    }

    const handleProviderSelect = async (p) => {
        setProvider(p)
        setProviderResults(false)
        const x = Object.values(allProvidersData).find(x => x.name === p).id
        setProviderId(x)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length) {
            return
        }


        const appt = {
            date,
            time
        }
        await dispatch(createAppt(provider_id, appt));

        await dispatch(fetchUserAppointments())
        setErrors({})
        setHasSubmitted(false);
        closeModal()
    }

    useEffect(() => {
        const errors = {};
        if (!provider.length) errors.provider = "Provider is required";
        if (!date) errors.date = "Date is required";
        if (!time) errors.time = "Time is required";

        setErrors(errors)

        const handleProviderClickOutside = (event) => {
            if (providerRef.current && !providerRef.current.contains(event.target)) closeProviderSearch();
        };
        if (providerResults) window.addEventListener('click', handleProviderClickOutside);


        return () => {

            window.removeEventListener('click', handleProviderClickOutside)
        };

    }, [providerResults, provider, date, time])



    return (
        <div id='add-appt-container'>
            <div id="add-appt-title">Add Appointment</div>

            <form id='add-appt-form-container' onSubmit={handleSubmit}>

                <div id="appt-provider-container">
                    <div className='add-appt-label'>
                        Provider
                    </div>

                    <div id='add-appt-provider-label'
                        onClick={(e) => { e.stopPropagation(); setProviderResults(!providerResults) }}>
                        {provider ? provider : "Select your provider ..."}
                    </div>

                    <div className={providerResults ? "appt-providerResults" : 'hidden'} ref={providerRef}>
                        <input type="text"
                            id="appt-provider-search-input"
                            placeholder="Search provider ..."
                            onChange={handleProviderFilter} />
                        {filteredProviders.map((p, key) => (
                            <div className="appt-option-container" key={key}>
                                <input type="radio" className="radio-input" id={p} name='directions' onChange={() => { handleProviderSelect(p) }} />
                                <label className="appt-radio-label" htmlFor={p}>{p}</label>
                            </div>
                        ))}
                    </div>
                    {hasSubmitted && errors.provider && <p className='errors'>{errors.provider}</p>}


                </div>

                <div id="date-time-contianer">
                    <div id="date-container">
                        <div className="add-appt-label">Date</div>
                        <input
                            type='date'
                            className='appt-date-picker'
                            onChange={(e) => setDate(e.target.value)}

                        />

                        {hasSubmitted && errors.date && <p className='errors'>{errors.date}</p>}

                    </div>

                    <div id="time-container">
                        <div className="add-appt-label">Time</div>

                        <input
                            type="time"
                            className='appt-time-picker'
                            name="appt"
                            onChange={(e) => setTime(e.target.value)}

                        />

                        {hasSubmitted && errors.time && <p className='errors'>{errors.time}</p>}

                    </div>
                </div>

                <button type="submit" id='add-appt-button'>Submit</button>
            </form>



        </div>
    )
}

export default AddNewApptModal