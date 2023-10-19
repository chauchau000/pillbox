import React from 'react'
import './LoginImage.css'
import anime from 'animejs'

function LoginImage() {
    function randomValues() {

        anime({
            targets: '.image-section-container',
            translateX: function() {
                return anime.random(0, 270);
              },
              translateY: function() {
                return anime.random(0, 270);
              },
              easing: 'easeInOutQuad',
              duration: 750,
              complete: randomValues
        });
        
    }

;

    return (
        <div id='image-page-container'>
            <div className="image-section-container">
                <span className="material-symbols-outlined white-icon end">
                    medication
                </span>
            </div>
            <div className="image-section-container">
            <span className="material-symbols-outlined white-icon almost-middle">
                    calendar_month
                </span>
            </div>
            <div className="image-section-container">
            <span className="material-symbols-outlined white-icon middle">
                    pill
                </span>
            </div>
            <div className="image-section-container">
            <span className="material-symbols-outlined white-icon almost-middle">
                    medical_services
                </span>
            </div>
            <div className="image-section-container">
            <span className="material-symbols-outlined white-icon end">
                    medication
                </span>
            </div>

        </div>
    )
}

export default LoginImage