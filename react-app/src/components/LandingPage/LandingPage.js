import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'
import PillGrid from '../PillGrid/PillGrid'


function LandingPage() {


    return (
        <div className="landing-page-container">
            <PillGrid />
            <div id='title'>pillbox
                <span className="material-symbols-outlined">
                    pill
                </span>
            </div>

            <p id="welcome">WELCOME</p>
            <p id="intro">Organize your medications and appointments all in one place.</p>

            <Link className='button' id="get-started" to='/signup'>Get started</Link>
            <Link className='button' id="login" to='/login'>Login</Link>

        </div>

    )
}

export default LandingPage