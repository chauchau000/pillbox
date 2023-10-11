import React, { useState, useRef, useEffect } from "react";
import { createUserMed, fetchUserMeds } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './AddMedModal.css'


const directionsArray = [
    'Take 1 tablet once daily', //
    'Take 1 tablet once daily in the morning',
    'Take 1 tablet once daily at lunch', //
    'Take 1 tablet once daily at noon', //
    'Take 1 tablet once daily in the evening',
    'Take 1 tablet once daily at bedtime',
    'Take 1 tablet twice daily',
    'Take 1 tablet three times daily',
    'Take 1 tablet four times daily',
    'Take 1 tablet every 6 hours',
    'Take 1 tablet every 8 hours',
    'Take 1 tablet every 12 hours',
    'Take 1 tablet every 6 hours as needed',
    'Take 1 tablet every 4 hours as needed',
    'Take 1 tablet every 8 hours as needed',
    'Take 1 tablet every 12 hours as needed',
    'Take 1 tablet every 2 hours as needed',
]

function AddMedModal() {
    const dispatch = useDispatch();
    const allMedsData = useSelector(state => state.meds)
    const allProviders = useSelector(state => state.providers)
    const allMeds = Object.values(allMedsData).map(med => med.name) // array of med names
    const userProviders = useSelector(state => state.session.providers)

    const [med, setMed] = useState("");
    const [finalMed, setFinalMed] = useState('');
    const [strength, setStrength] = useState("");
    const [provider, setProvider] = useState("");
    const [provider_id, setProviderId] = useState(0);
    const [directions, setDirections] = useState("");
    const [indication, setIndication] = useState("");
    const [isActive, setIsActive] = useState('false');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    //Medication search
    const [filteredMeds, setFilteredMeds] = useState([])
    const [medResults, setMedResults] = useState(true)
    const medRef = useRef(null);

    const closeMedSearch = () => setMedResults(false);

    const handleMedsFilter = (event) => {
        setMed(event.target.value)
        let searchWord = event.target.value;
        const newFilter = allMeds.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase())
        })

        if (searchWord === '') {
            setFilteredMeds([])
        } else {
            setFilteredMeds(newFilter)
        }
    }

    //Select Strength
    let strengthOptions;

    if (finalMed) {
        strengthOptions = Object.values(allMedsData).find(m => m.name === finalMed).strengths
    }

    const handleStrengthSelect = (e) => {
        const strength = e.target.value;
        setStrength(strength)
    }

    //Directions
    const [filteredDirections, setFilteredDirections] = useState([])
    const [directionsResults, setDirectionsResults] = useState(true)
    const directionsRef = useRef(null);

    const closeDirectionsSearch = () => setDirectionsResults(false);

    const handleDirectionsFilter = (event) => {
        setDirections(event.target.value)
        let searchWord = event.target.value;
        const newFilter = directionsArray.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === '') {
            setFilteredDirections([])
        } else {
            setFilteredDirections(newFilter)
        }
    }

    //Provider Selection

    const handleProviderSelect = async (e) => {
        const p = e.target.value;
        setProvider(p)
        const x = userProviders.find(x => x.name === p).id
        setProviderId(x)
    }

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const med_id = Object.values(allMedsData).find(m => m.name === med).id
        const newMed = {
            strength,
            directions,
            indication,
            isActive,
        }
        const data = await dispatch(createUserMed(med_id, provider_id, newMed));
        // console.log(newMed)
        if (data.errors) {
            console.log(data)
            setErrors(data.errors);
        } else {
            dispatch(fetchUserMeds())
            closeModal()
        }
    };


    useEffect(() => {

        const handleClickOutside = (event) => {
            if (medRef.current && !medRef.current.contains(event.target)) closeMedSearch();
        };
        if (medResults) window.addEventListener('click', handleClickOutside);

        const handleDirectionsClickOutside = (event) => {
            if (directionsRef.current && !directionsRef.current.contains(event.target)) closeDirectionsSearch();
        };
        if (directionsResults) window.addEventListener('click', handleDirectionsClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('click', handleDirectionsClickOutside)
        };

    }, [medResults, directionsResults])

    return (
        <div id="add-med-modal-container">
            <div id="add-med-title">Add Medication</div>
            <form id='add-med-form-container' onSubmit={handleSubmit}>
                <div id={errors.length ? 'errors-div' : 'hidden-errors'} >
                    {errors.map((error, idx) => (
                        <p className='p-error' key={idx}>{error}</p>
                    ))}
                </div>

                <div id="med-strength-container">
                    <div id='med-container'>
                        <label className='add-med-label'>
                            Medication
                        </label>
                        <input
                            className='form-input'
                            ref={medRef}
                            type="text"
                            value={med}
                            onChange={handleMedsFilter}
                            onClick={() => { setMedResults(true) }}
                            required
                        />
                        {filteredMeds.length > 0 &&
                            <div className={medResults ? "dataResult" : "hidden"}>
                                {filteredMeds?.map((med, key) => {
                                    return (
                                        <div key={key} className="dataResults-container" onClick={() => {
                                            setMed(med)
                                            setFinalMed(med)
                                        }}>
                                            <p className='med-result'>{med}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                    <div id="strength-container">
                        <label className='add-med-label'>
                            Strength
                        </label>
                        <select name='strength'
                            className='select-input'
                            onChange={handleStrengthSelect}>

                            <option value='' disabled selected>Strength</option>
                            {finalMed && strengthOptions.map((strength, key) => (
                                <option key={key} value={strength}>
                                    {strength}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div id="directions-container">
                    <label className='add-med-label'>
                        Directions
                    </label>
                    <input
                        id='directions-input'
                        ref={directionsRef}
                        type="text"
                        value={directions}
                        onChange={handleDirectionsFilter}
                        onClick={() => { setDirectionsResults(true) }}
                        required
                    />

                    {filteredDirections.length > 0 &&
                        <div className={directionsResults ? "directionsResult" : "hidden"}>
                            {filteredDirections?.map((direction, key) => {
                                return (
                                    <p key={key} className='direction-text' onClick={() => {
                                        setDirections(direction)
                                    }}>{direction}</p>
                                )
                            })}
                        </div>
                    }
                </div>


                <div id="indication-provider-container">
                    <div id="indications-container">

                        <label className='add-med-label'>
                            Indication
                        </label>
                        <input
                            className='form-input'
                            type="text"
                            value={indication}
                            onChange={(e) => setIndication(e.target.value)}
                            required
                        />
                    </div>
                    <div id="provider-container">
                        <label className='add-med-label'>
                            Provider
                        </label>

                        <select name='provider'
                            className='select-input'
                            onChange={handleProviderSelect}
                            required>
                            <option value='' disabled selected>Provider</option>

                            {userProviders.map((p, key) => (
                                <option key={key} value={p.name}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                <div id="activity-provider-container">

                    <div id='med-active-container' >
                        <div id='active-choice-1'>

                            <input type="radio" id="active" name="active" value="active" onChange={() => setIsActive('True')} />
                            <label className='activity-label' htmlFor="active">Active</label>
                        </div>
                        <div id="active-choice-2">
                            <input type="radio" id="inactive" name="active" value="inactive" onChange={() => setIsActive('False')} />
                            <label className='activity-label' htmlFor="inactive">Inactive</label>
                        </div>
                    </div>
                    <div id="add-provider-container">
                        <p id='add-provider-text'>Don't see your provider? Add a new provider here.</p>
                        <button id="add-provider-btn"> Add new provider
                        </button>
                    </div>
                </div>


                <button type="submit" id='add-med-button'>Add Med</button>
            </form >
        </div>
    )
}

export default AddMedModal