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
    'Take 1 tablet every hour as needed',

    'Take 1 capsule once daily', //
    'Take 1 capsule once daily in the morning',
    'Take 1 capsule once daily at lunch', //
    'Take 1 capsule once daily at noon', //
    'Take 1 capsule once daily in the evening',
    'Take 1 capsule once daily at bedtime',
    'Take 1 capsule twice daily',
    'Take 1 capsule three times daily',
    'Take 1 capsule four times daily',
    'Take 1 capsule every 6 hours',
    'Take 1 capsule every 8 hours',
    'Take 1 capsule every 12 hours',
    'Take 1 capsule every 6 hours as needed',
    'Take 1 capsule every 4 hours as needed',
    'Take 1 capsule every 8 hours as needed',
    'Take 1 capsule every 12 hours as needed',
    'Take 1 capsule every 2 hours as needed',
    'Take 1 capsule every hour as needed',

]

function AddMedModal() {
    const dispatch = useDispatch();
    const allMedsData = useSelector(state => state.meds)
    const allProvidersData = useSelector(state => state.providers)
    const allMeds = Object.values(allMedsData).map(med => med.name).sort() // array of med names
    const allProviders = Object.values(allProvidersData).map(p => p.name).sort() // array of med names

    const [med, setMed] = useState("");
    const [finalMed, setFinalMed] = useState('');
    const [strength, setStrength] = useState("");
    const [provider, setProvider] = useState("");
    const [provider_id, setProviderId] = useState(0);
    const [directions, setDirections] = useState("");
    const [indication, setIndication] = useState("");
    const [isActive, setIsActive] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const { closeModal } = useModal();

    //Medication search
    const [filteredMeds, setFilteredMeds] = useState([...allMeds])
    const [medResults, setMedResults] = useState(false)
    const medRef = useRef(null);

    const closeMedSearch = () => setMedResults(false);

    const handleMedsFilter = (event) => {

        let searchWord = event.target.value;
        const newFilter = allMeds.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase())
        })

        if (searchWord === '') {
            setFilteredMeds([...allMeds])
        } else {
            setFilteredMeds(newFilter)
        }
    }

    const handleMedSelect = (m) => {
        setMed(m)
        setFinalMed(m)
        setMedResults(false)
    }

    // console.log(med)

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
    const [filteredDirections, setFilteredDirections] = useState([...directionsArray])
    const [directionsResults, setDirectionsResults] = useState(false)
    const directionsRef = useRef(null);

    const closeDirectionsSearch = () => setDirectionsResults(false);

    const handleDirectionsFilter = (event) => {
        let searchWord = event.target.value;
        const newFilter = directionsArray.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === '') {
            setFilteredDirections([...directionsArray])
        } else {
            setFilteredDirections(newFilter)
        }
    }

    const handleDirectionSelect = (d) => {
        setDirections(d)
        setDirectionsResults(false)
    }

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

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);


        if (Object.keys(errors).length) {
            return
        }


        const med_id = Object.values(allMedsData).find(m => m.name === med).id
        const newMed = {
            strength,
            directions,
            indication,
            isActive,
        }
        await dispatch(createUserMed(med_id, provider_id, newMed));
        // console.log(newMed)

        await dispatch(fetchUserMeds())
        setErrors({})
        setHasSubmitted(false);
        closeModal()

    };

    useEffect(() => {
        const errors = {};
        if (!finalMed.length) errors.med = "Medication is required";
        if (!strength.length) errors.strength = "Strength is required";
        if (!provider.length) errors.provider = "Provider is required";
        if (!directions.length) errors.directions = "Directions is required";
        if (!indication.length) errors.indication = "Indication is required";
        if (!isActive.length) errors.isActive = "Active or inactive is required";

        setErrors(errors)

        const handleClickOutside = (event) => {
            if (medRef.current && !medRef.current.contains(event.target)) closeMedSearch();
        };
        if (medResults) window.addEventListener('click', handleClickOutside);

        const handleDirectionsClickOutside = (event) => {
            if (directionsRef.current && !directionsRef.current.contains(event.target)) closeDirectionsSearch();
        };
        if (directionsResults) window.addEventListener('click', handleDirectionsClickOutside);

        const handleProviderClickOutside = (event) => {
            if (providerRef.current && !providerRef.current.contains(event.target)) closeProviderSearch();
        };
        if (providerResults) window.addEventListener('click', handleProviderClickOutside);


        return () => {
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('click', handleDirectionsClickOutside)
            window.removeEventListener('click', handleProviderClickOutside)
        };

    }, [medResults, directionsResults, providerResults, finalMed, strength, provider, directions, indication, isActive])

    return (
        <div id="add-med-modal-container">
            <div id="add-med-title">Add Medication</div>
            <form id='add-med-form-container' onSubmit={handleSubmit}>
                <div id="med-strength-container">
                    <div id='med-container'>
                        <div className='add-med-label'>
                            Medication
                        </div>

                        <div id='add-med-box' onClick={(e) => { e.stopPropagation(); setMedResults(!medResults) }}>
                            {med ? med : "Select your medication ..."}
                        </div>

                        <div className={medResults ? "med-results-container" : 'hidden'} ref={medRef}>
                            <input type="text"
                                id="med-search-input"
                                onChange={handleMedsFilter}
                                placeholder='Search here' 
                                value={strength}/>
                            {filteredMeds.map((m, key) => (
                                <div className="option-container" key={key} onClick={() => { handleMedSelect(m) }}>
                                    <input type="radio" className="radio-input" id={m} name='medication' />
                                    <label className="radio-label" htmlFor={m}>{m}</label>
                                </div>
                            ))}
                        </div>
                        {hasSubmitted && errors.med && <p className='errors'>{errors.med}</p>}


                    </div>
                    <div id="strength-container">
                        <label className='add-med-label'>
                            Strength
                        </label>
                        <select name='strength'
                            className='strength-input'
                            onChange={handleStrengthSelect}>

                            <option value='' disabled selected>Strength</option>
                            {med && strengthOptions.map((strength, key) => (
                                <option key={key} value={strength}>
                                    {strength}
                                </option>
                            ))}
                        </select>
                        {hasSubmitted && errors.strength && <p className='errors'>{errors.strength}</p>}

                    </div>
                </div>

                <div id="directions-container">
                    <div className='add-med-label'>
                        Directions
                    </div>
                    <div id='add-directions-box'
                        onClick={(e) => { e.stopPropagation(); setDirectionsResults(!directionsResults) }}>
                        {directions ? directions : "Select your directions ... "}
                    </div>

                    <div className={directionsResults ? "directionsResult" : 'hidden'} ref={directionsRef}>
                        <input type="text"
                            id="directions-search-input"
                            placeholder='Search directions'
                            onChange={handleDirectionsFilter} />
                        {filteredDirections.map((d, key) => (
                            <div className="option-container" key={key} onClick={() => { handleDirectionSelect(d) }}>
                                <input type="radio" className="radio-input" id={d} name='directions' />
                                <label className="radio-label" htmlFor={d}>{d}</label>
                            </div>
                        ))}
                    </div>

                    {hasSubmitted && errors.directions && <p className='errors'>{errors.directions}</p>}

                </div>


                <div id="indication-provider-container">
                    <div id="indications-container">

                        <label className='add-med-label'>
                            Indication
                        </label>
                        <input
                            id='indication-input'
                            placeholder='Type here ...'
                            type="text"
                            value={indication}
                            onChange={(e) => setIndication(e.target.value)}
                        />
                        {hasSubmitted && errors.indication && <p className='errors'>{errors.indication}</p>}

                    </div>


                    <div id="provider-container">
                        <div className='add-med-label'>
                            Provider
                        </div>
                        <div>
                            <div id='add-provider-label'
                                onClick={(e) => { e.stopPropagation(); setProviderResults(!providerResults) }}>
                                {provider ? provider : "Select your provider ..."}
                            </div>

                            <div className={providerResults ? "providerResults" : 'hidden'} ref={providerRef}>
                                <input type="text"
                                    id="provider-search-input"
                                    placeholder='Search provider'

                                    onChange={handleProviderFilter} />
                                {filteredProviders.map((p, key) => (
                                    <div className="option-container" key={key}>
                                        <input type="radio" className="radio-input" id={p} name='directions' onChange={() => { handleProviderSelect(p) }} />
                                        <label className="radio-label" htmlFor={p}>{p}</label>
                                    </div>
                                ))}
                            </div>
                            {hasSubmitted && errors.provider && <p className='errors'>{errors.provider}</p>}

                        </div>

                    </div>
                </div>

                <div id="addmed-activity-provider-container">

                    <div id='med-active-container' >
                        <div id="active-inactive-radio">

                            <div id='active-choice-1'>

                                <input type="radio" id="active" name="active" value="active" onChange={() => setIsActive('true')} />
                                <label className='activity-label' htmlFor="active">Active</label>
                            </div>
                            <div id="active-choice-2">
                                <input type="radio" id="inactive" name="active" value="inactive" onChange={() => setIsActive('false')} />
                                <label className='activity-label' htmlFor="inactive">Inactive</label>
                            </div>
                        </div>
                        {hasSubmitted && errors.isActive && <p className='errors'>{errors.isActive}</p>}

                    </div>
                    <div id="addmedform-provider-container">
                        <p id='add-provider-text'>Don't see your provider? Add a new provider on the home page.</p>
                    </div>
                </div>


                <button type="submit" id='add-med-button'>Add Med</button>
            </form >
        </div>
    )
}

export default AddMedModal