import React from 'react'
import './PillGrid.css'
import anime from 'animejs';


const GRID_WIDTH = 15;
const GRID_HEIGHT = 15;

function PillGrid() {


    const handlePillClick = (e) => {
        anime({
          targets: ".pill",
          scale: [
            { value: 1.35, easing: "easeOutSine", duration: 250 },
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
          delay: anime.stagger(100, {
            grid: [GRID_WIDTH, GRID_HEIGHT],
            from: e.target.dataset.index,
          }),
        });
      };


    const pills = [];
    let index = 0;

    for (let i = 0; i < GRID_WIDTH; i++) {
        for (let j = 0; j < GRID_HEIGHT; j++) {
            pills.push(
                <div className="pillbox"
                    data-index={index}
                    key={`${i}-${j}`}

                >
                    <span 
                    className="material-symbols-outlined pill"
                    data-index={index}
                    onClick={handlePillClick}
                    >
                        pill
                    </span>
                </div>
            )
            index++
        }
    }


    return (
        <div id='pillbox-grid-container'>
            {pills}
        </div>
    )
}

export default PillGrid


