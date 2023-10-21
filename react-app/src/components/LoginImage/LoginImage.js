import React from 'react'
import './LoginImage.css'
import anime from 'animejs'

const GRID_WIDTH = 13;
const GRID_HEIGHT = 5;

function LoginImage() {
    const handlePillClick = (e) => {
        anime({
            targets: ".image-section-container",
            scale: [
                { value: 1.1, easing: "easeOutSine", duration: 250 },
                { value: 1, easing: "easeInOutQuad", duration: 500 },
            ],
            translateY: [
                { value: -15, easing: "easeOutSine", duration: 250 },
                { value: 0, easing: "easeInOutQuad", duration: 500 },
            ],
            opacity: [
                { value: 1, easing: "easeOutSine", duration: 250 },
                { value: 0.5, easing: "easeInOutQuad", duration: 500 },
            ],
            delay: anime.stagger(200, {
                grid: [GRID_WIDTH, GRID_HEIGHT],
                from: e.target.dataset.index,
            }),
        });
    };
    const icons = ["medication", "calendar_month", "pill", "medical_services", "medication"]

    const pills = [];
    let index = 0;

    for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
            pills.push(
                <div className="image-section-container"
                    data-index={index}
                    key={`${i}-${j}`}

                    onClick={handlePillClick}
                >
                    <span className="material-symbols-outlined white-icon"
                        data-index={index}
                    >
                        {icons[j]}
                    </span>
                </div>

            )
            index++
        }
    }

    return (
        <div id='image-page-container'>
            {pills}

        </div>
    )
}

export default LoginImage