import React, { useState, useRef, useEffect } from "react";
import { createUserMed, fetchUserMeds } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './AddMedModal.css'


const directionsArray = [
    'Take 1 tablet by mouth once daily',
    'Take 1 tablet by mouth twice daily',
    'Take 1 tablet by mouth three times daily',
    'Take 1 tablet by mouth four times daily',
    'Take 1 tablet by mouth every 6 hours',
    'Take 1 tablet by mouth every 8 hours',
    'Take 1 tablet by mouth every 12 hours',
    'Take 1 tablet by mouth every 4 hours',
    'Take 1 tablet by mouth every 6 hours as needed',
    'Take 1 tablet by mouth every 4 hours as needed',
    'Take 1 tablet by mouth every 8 hours as needed',
    'Take 1 tablet by mouth every 12 hours as needed',
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
    const [directions, setDirections] = useState("");
    const [indication, setIndication] = useState("");
    const [isActive, setIsActive] = useState(false);
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

    const handleProviderSelect = (e) => {
        const p = e.target.value;
        setProvider(p)
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        const med_id = Object.values(allMedsData).find(m => m.name === med).id
        const provider_id = Object.values(allProviders).find(p => p.name === provider).id;
        const newMed = {
            strength,
            directions,
            indication,
            isActive,
        }
        const data = await dispatch(createUserMed(med_id, provider_id, newMed));
        console.log(data)

        if (data.errors) {
            setErrors(data);
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
        <>
            <div id="add-med-title">Add a medication to your list</div>
            <form id='add-med-form-container' onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label className='add-med-label'>
                    Medication
                </label>
                <input
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
                                <div key={key} className="dataResults-container">
                                    <p onClick={() => {
                                        setMed(med)
                                        setFinalMed(med)
                                    }}>{med}</p>
                                </div>
                            )
                        })}
                    </div>
                }

                <label className='add-med-label'>
                    Strength
                </label>
                <select name='strength' onChange={handleStrengthSelect}>
                    <option value='' disabled selected>Strength</option>

                    {finalMed && strengthOptions.map((strength, key) => (
                        <option key={key} value={strength}>
                            {strength}
                        </option>
                    ))}
                </select>

                <label className='add-med-label'>
                    Directions
                </label>
                <input
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
                                <div key={key} className="directionsResult-container">
                                    <p onClick={() => {
                                        setDirections(direction)
                                    }}>{direction}</p>
                                </div>
                            )
                        })}
                    </div>
                }



                <label className='add-med-label'>
                    Indication
                </label>
                <input
                    type="text"
                    value={indication}
                    onChange={(e) => setIndication(e.target.value)}
                    required
                />


                <label className='add-med-label'>
                    Provider
                </label>

                <select name='provider' onChange={handleProviderSelect}>
                    <option value='' disabled selected>Provider</option>

                    {userProviders.map(p => (
                        <option value={p.name}>
                            {p.name}
                        </option>
                    ))}
                </select>




                <div id='med-active-container'>
                    <div id='active-choice-1'>

                        <input type="radio" id="active" name="active" value="active" onChange={() => setIsActive(true)} />
                        <label htmlFor="active">Active</label>
                    </div>
                    <div id="active-choice-2">

                        <input type="radio" id="inactive" name="active" value="inactive" onChange={() => setIsActive(false)} />
                        <label htmlFor="inactive">Inactive</label>
                    </div>
                </div>



                <button type="submit">Add Med</button>
            </form >
        </>
    )
}

export default AddMedModal