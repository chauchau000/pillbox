import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editMed, fetchUserMeds } from '../../store/session'
import { useModal } from '../../context/Modal'
import './EditMedModal.css'

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


function EditMedModal({userMed}) {
    // console.log(userMed)
    const dispatch = useDispatch();
    const allProvidersData = useSelector(state => state.providers)
    const allProviders = Object.values(allProvidersData).map(p => p.name).sort() // array of med names
    const allMedsData = useSelector(state => state.meds)

    const [strength, setStrength] = useState(userMed.strength);
    const [provider, setProvider] = useState(userMed.provider_id.name);
    const [provider_id, setProviderId] = useState(userMed.provider_id.id);
    const [directions, setDirections] = useState(userMed.directions);
    const [indication, setIndication] = useState(userMed.indication);
    const [isActive, setIsActive] = useState(userMed.active);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    //Select Strength
    // let strengthOptions = []
    let strengthOptions = Object.values(allMedsData).find(m => m.name === userMed.medication.name).strengths
    

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
        const x =Object.values(allProvidersData).find(x => x.name === p).id
        setProviderId(x)
    }

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMed = {
            strength,
            directions,
            indication,
            isActive,
            provider_id
        }
        const data = await dispatch(editMed(userMed.id, newMed));
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


        const handleDirectionsClickOutside = (event) => {
            if (directionsRef.current && !directionsRef.current.contains(event.target)) closeDirectionsSearch();
        };
        if (directionsResults) window.addEventListener('click', handleDirectionsClickOutside);

        const handleProviderClickOutside = (event) => {
            if (providerRef.current && !providerRef.current.contains(event.target)) closeProviderSearch();
        };
        if (providerResults) window.addEventListener('click', handleProviderClickOutside);


        return () => {
            window.removeEventListener('click', handleDirectionsClickOutside)
            window.removeEventListener('click', handleProviderClickOutside)
        };

    }, [directionsResults, providerResults])

    return (
        <div id="edit-med-modal-container">
            <div id="edit-med-title">Edit Medication</div>
            <form id='edit-med-form-container' onSubmit={handleSubmit}>
                <div id={errors.length ? 'errors-div' : 'hidden-errors'} >
                    {errors.map((error, idx) => (
                        <p className='p-error' key={idx}>{error}</p>
                    ))}
                </div>

                    
                    <div id="strength-container">
                        <label className='edit-med-label'>
                            Strength
                        </label>
                        <select name='strength'
                            className='select-input'
                            onChange={handleStrengthSelect}>

                            <option value='' disabled selected>Strength</option>
                            {strengthOptions.map((strength, key) => (
                                <option key={key} value={strength}>
                                    {strength}
                                </option>
                            ))}
                        </select>
                    </div>


                <div id="directions-container">
                    <div className='edit-directions-label'>
                        Directions
                    </div>
                    <div>
                        <div id='edit-directions-label'
                            className='edit-med-label'
                            onClick={(e) => { e.stopPropagation(); setDirectionsResults(!directionsResults) }}>
                            {directions ? directions : "Select your directions ... "}
                        </div>

                        <div className={directionsResults ? "directionsResult" : 'hidden'} ref={directionsRef}>
                            <input type="text"
                                className="directions-search-input"
                                onChange={handleDirectionsFilter} />
                            {filteredDirections.map((d, key) => (
                                <div className="option" key={key}>
                                    <input type="radio" className="radio-input" id={d} name='directions' onChange={() => { handleDirectionSelect(d) }} />
                                    <label htmlFor={d}>{d}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div id="indication-provider-container">
                    <div id="indications-container">

                        <label className='edit-med-label'>
                            Indication
                        </label>
                        <input
                            className='form-input'
                            type="text"
                            value={indication}
                            placeholder={indication}
                            onChange={(e) => setIndication(e.target.value)}
                            required
                        />
                    </div>


                    <div id="provider-container">
                        <div className='edit-provider-label'>
                            Provider
                        </div>
                        <div>
                            <div id='edit-provider-label'
                                className='edit-provider-label'
                                onClick={(e) => { e.stopPropagation(); setProviderResults(!providerResults) }}>
                                {provider ? provider : "Select your provider ..."}
                            </div>

                            <div className={providerResults ? "providerResults" : 'hidden'} ref={providerRef}>
                                <input type="text"
                                    className="provider-search-input"
                                    onChange={handleProviderFilter} />
                                {filteredProviders.map((p, key) => (
                                    <div className="option" key={key}>
                                        <input type="radio" className="radio-input" id={p} name='directions' onChange={() => { handleProviderSelect(p) }} />
                                        <label htmlFor={p}>{p}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

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
                    <div id="edit-provider-container">
                        <p id='edit-provider-text'>Don't see your provider? Add a new provider here.</p>
                        <div id="edit-provider-btn"> Add new provider
                        </div>
                    </div>
                </div>


                <button type="submit" id='edit-med-button'>Save changes</button>
            </form >



        </div>
    )
}

export default EditMedModal