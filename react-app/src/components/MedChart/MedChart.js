import React from 'react'
import { useSelector } from 'react-redux'
import './MedChart.css'

const GRID_WIDTH = 3;
const GRID_HEIGHT = 7;

function MedChart() {
    const amMeds = useSelector(state => state.session.am)
    const noonMeds = useSelector(state => state.session.noon)
    const pmMeds = useSelector(state => state.session.pm)
    const hsMeds = useSelector(state => state.session.hs)
    const prnMeds = useSelector(state => state.session.prn)

    // const AM_OVERLAY = [];
    // let index = 0;

    // for (let i = 0; i < GRID_WIDTH; i++) {
    //     for (let j = 0; j < GRID_HEIGHT; j++) {
    //         AM_OVERLAY.push(
    //             <div className="AM-box"
    //                 data-index={index}
    //                 key={`${i}-${j}`}

    //             >
    //                 <span 
    //                 className="material-symbols-outlined AM-OVERLAY-ICON"
    //                 data-index={index}
    //                 >
    //                     sunny
    //                 </span>
    //             </div>
    //         )
    //         index++
    //     }
    // }


    // const NOON_OVERLAY = [];

    // for (let i = 0; i < GRID_WIDTH; i++) {
    //     for (let j = 0; j < GRID_HEIGHT; j++) {
    //         NOON_OVERLAY.push(
    //             <div className="NOON-box"
    //                 data-index={index}
    //                 key={`${i}-${j}`}

    //             >
    //                 <span 
    //                 className="material-symbols-outlined NOON-OVERLAY-ICON"
    //                 data-index={index}
    //                 >
    //                      wb_sunny
    //                 </span>
    //             </div>
    //         )
    //         index++
    //     }
    // }


    return (
        <div id="chart-container">

            <div id='schedule-container'>
                <div id="am-container" className='section-container'>
                    {/* <div id="am-overlay">
                    {AM_OVERLAY}
                        </div> */}
                    <p className="section-title">Morning
                        <span className="material-symbols-outlined med-chart-icon" id='morning-icon'>
                            sunny
                        </span></p>
                    {amMeds?.map((med, idx) => (
                        <div className={`med-container`} key={idx}>
                            <div className="med-card">
                                <div className="front">
                                    <p className='med-icon-text'>{med.medication.name} </p>
                                    <p className='med-icon-text'>{med.strength} </p>
                                </div>
                                <div className="back">
                                    <p className="med-icon-text">{med.directions}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div id="noon-container" className='section-container'>
                    {/* <div id="noon-overlay">
                        {NOON_OVERLAY}
                    </div> */}
                    <p className="section-title">Noon
                        <span className="material-symbols-outlined med-chart-icon" id='noon-icon'>
                            wb_sunny
                        </span></p>
                    {noonMeds?.map((med, idx) => (
                        <div className={`med-container`} key={idx}>
                            <div className="med-card">
                                <div className="front">
                                    <p className='med-icon-text'>{med.medication.name} </p>
                                    <p className='med-icon-text'>{med.strength} </p>
                                </div>
                                <div className="back">
                                    <p className="med-icon-text">{med.directions}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="evening-container" className='section-container'>
                    <p className="section-title">Evening
                        <span className="material-symbols-outlined med-chart-icon" id='evening-icon'>
                            wb_twilight
                        </span>
                    </p>
                    {pmMeds?.map((med, idx) => (
                        <div className={`med-container`} key={idx}>
                            <div className="med-card">
                                <div className="front">
                                    <p className='med-icon-text'>{med.medication.name} </p>
                                    <p className='med-icon-text'>{med.strength} </p>
                                </div>
                                <div className="back">
                                    <p className="med-icon-text">{med.directions}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="bedtime-container" className='section-container'>
                    <p className="section-title">Bedtime
                        <span className="material-symbols-outlined med-chart-icon" id='bedtime-icon'>
                            bedtime
                        </span>
                    </p>
                    {hsMeds?.map((med, idx) => (
                        <div className={`med-container`} key={idx}>
                            <div className="med-card">
                                <div className="front">
                                    <p className='med-icon-text'>{med.medication.name} </p>
                                    <p className='med-icon-text'>{med.strength} </p>
                                </div>
                                <div className="back">
                                    <p className="med-icon-text">{med.directions}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id='prn-container'>
                <p className="section-title">As needed</p>

                {prnMeds?.map((med, idx) => (
                    <div className={`med-container`} key={idx}>
                        <div className="med-card">
                            <div className="front">
                                <p className='med-icon-text'>{med.medication.name} </p>
                                <p className='med-icon-text'>{med.strength} </p>
                            </div>
                            <div className="back">
                                <p className="med-icon-text">{med.directions}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default MedChart