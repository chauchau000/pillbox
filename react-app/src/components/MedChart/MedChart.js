import React from 'react'
import { useSelector } from 'react-redux'
import './MedChart.css'


function MedChart() {
    const amMeds = useSelector(state => state.session.am)
    const noonMeds = useSelector(state => state.session.noon)
    const pmMeds = useSelector(state => state.session.pm)
    const hsMeds = useSelector(state => state.session.hs)
    const prnMeds = useSelector(state => state.session.prn)


    return (
        <div id="chart-container">

            <div id='schedule-container'>
                <div id="am-container" className='section-container'>
                    <p className="section-title">AM</p>
                    {amMeds?.map((med, idx) => (
                        <div className="med-icon-div" key={idx}>
                            <p className='med-icon-text'>{med.medication.name} </p>
                            <p className='med-icon-text'>{med.strength} </p>
                        </div>
                    ))}

                </div>
                <div id="noon-container" className='section-container'>
                    <p className="section-title">Noon</p>
                    {noonMeds?.map((med, idx) => (
                        <div className="med-icon-div" key={idx}>
                            <p className='med-icon-text'>{med.medication.name} </p>
                            <p className='med-icon-text'>{med.strength} </p>                        </div>
                    ))}
                </div>
                <div id="evening-container" className='section-container'>
                    <p className="section-title">Evening</p>
                    {pmMeds?.map((med, idx) => (
                        <div className="med-icon-div" key={idx}>
                            <p className='med-icon-text'>{med.medication.name} </p>
                            <p className='med-icon-text'>{med.strength} </p>                        </div>
                    ))}
                </div>
                <div id="bedtime-container" className='section-container'>
                    <p className="section-title">Bedtime</p>
                    {hsMeds?.map((med, idx) => (
                        <div className="med-icon-div" key={idx}>
                            <p className='med-icon-text'>{med.medication.name} </p>
                            <p className='med-icon-text'>{med.strength} </p>                        </div>
                    ))}
                </div>
            </div>
            <div id='prn-container'>
                {prnMeds?.map((med, idx) => (
                    <div className="prn-meds-div" key={idx}>
                            <p className='med-icon-text'>{med.medication.name} </p>
                            <p className='med-icon-text'>{med.strength} </p>                    </div>
                ))}
            </div>
        </div>

    )
}

export default MedChart