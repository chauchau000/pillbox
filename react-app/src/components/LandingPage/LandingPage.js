import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'


function LandingPage() {


    return (
        <div className="landing-page-container">
            <div id='title'>pillbox</div>

            <p id="welcome">WELCOME</p>
            <p id="intro">Organize your medications and appointments all in one place.</p>

            <Link className='button' id="get-started">Get started</Link>
            <Link className='button' id="login">Login</Link>
        </div>

    )
}

export default LandingPage