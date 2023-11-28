import React from 'react';
import './schedule.css'

export default function Schedule(){
    return(
        <section className='schedule-container flex flex-column'>
            <div className='task-tab'>
                <button>Personal</button>
                <button>Work</button>
            </div>
            <div className='day-button-container'>
                <button>M</button>
                <button>T</button>
                <button>W</button>
                <button>TH</button>
                <button>F</button>
                <button>SA</button>
                <button>SU</button>
            </div>
            <div>
                <div className='flex day-info-container'>
                    <h2 className='mp-0'>Wednesday</h2>
                    <button className='mp-0'>^</button>
                </div>
                <p className='mp-0 current-date'>Nov 3, 2023</p>
            </div>
            <hr/>
        </section>
    )
}