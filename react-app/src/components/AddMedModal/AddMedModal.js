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
    const [isActive, setIsActive] = useState('false');
    const [errors, setErrors] = useState([]);
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

        const handleProviderClickOutside = (event) => {
            if (providerRef.current && !providerRef.current.contains(event.target)) closeProviderSearch();
        };
        if (providerResults) window.addEventListener('click', handleProviderClickOutside);


        return () => {
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('click', handleDirectionsClickOutside)
            window.removeEventListener('click', handleProviderClickOutside)
        };

    }, [medResults, directionsResults, providerResults])

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
                        <div className='add-med-label'>
                            Medication
                        </div>
                        <div>
                            <div id='add-med-box' onClick={(e) => { e.stopPropagation(); setMedResults(!medResults) }}>
                                {med ? med : "Select your medication ..."}
                            </div>

                            <div className={medResults ? "med-results-container" : 'hidden'} ref={medRef}>
                                <input type="text"
                                    id="med-search-input"
                                    onChange={handleMedsFilter}
                                    placeholder='Search here' />
                                {filteredMeds.map((m, key) => (
                                    <div className="option-container" key={key}>
                                        <input type="radio" className="radio-input" id={m} name='medication' onChange={() => { handleMedSelect(m) }} />
                                        <label className="radio-label" htmlFor={m}>{m}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

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
                    </div>
                </div>

                <div id="directions-container">
                    <div className='add-med-label'>
                        Directions
                    </div>
                    <div>
                        <div id='add-directions-box'
                            onClick={(e) => { e.stopPropagation(); setDirectionsResults(!directionsResults) }}>
                            {directions ? directions : "Select your directions ... "}
                        </div>

                        <div className={directionsResults ? "directionsResult" : 'hidden'} ref={directionsRef}>
                            <input type="text"
                                id="directions-search-input"
                                onChange={handleDirectionsFilter} />
                            {filteredDirections.map((d, key) => (
                                <div className="option-container" key={key}>
                                    <input type="radio" className="radio-input" id={d} name='directions' onChange={() => { handleDirectionSelect(d) }} />
                                    <label className="radio-label" htmlFor={d}>{d}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div id="indication-provider-container">
                    <div id="indications-container">

                        <label className='add-med-label'>
                            Indication
                        </label>
                        <input
                            id='indication-input'
                            type="text"
                            value={indication}
                            onChange={(e) => setIndication(e.target.value)}
                            required
                        />
                    </div>


                    <div id="provider-container">
                        <div className='add-med-label'>
                            Provider
                        </div>
                        <div>
                            <div id='add-provider-label'
                                className='add-provider-label'
                                onClick={(e) => { e.stopPropagation(); setProviderResults(!providerResults) }}>
                                {provider ? provider : "Select your provider ..."}
                            </div>

                            <div className={providerResults ? "providerResults" : 'hidden'} ref={providerRef}>
                                <input type="text"
                                    id="provider-search-input"
                                    onChange={handleProviderFilter} />
                                {filteredProviders.map((p, key) => (
                                    <div className="option-container" key={key}>
                                        <input type="radio" className="radio-input" id={p} name='directions' onChange={() => { handleProviderSelect(p) }} />
                                        <label className="radio-label" htmlFor={p}>{p}</label>
                                    </div>
                                ))}
                            </div>
                        </div>



                        {/* <label className='add-med-label'>
                            Provider
                        </label>

                        <select name='provider'
                            className='select-input'
                            onChange={handleProviderSelect}
                            required>
                            <option value='' disabled selected>Provider</option>

                            {allProviders.map((p, key) => (
                                <option key={key} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select> */}

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
                        <div id="add-provider-btn"> Add new provider
                        </div>
                    </div>
                </div>


                <button type="submit" id='add-med-button'>Add Med</button>
            </form >
        </div>
    )
}

export default AddMedModal