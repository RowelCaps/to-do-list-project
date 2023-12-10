import React from 'react'
import {NavLink} from 'react-router-dom'
import './user-header.css'

export default function UserHeader(){
    return (
        <header className='flex flex-column user-header'>
            <div className='flex user-container'>
                <img src='vite.svg'/>
                <p className='mp-0'>Rowel</p>
            </div>
            <div className='flex flex-column nav-container'>
                <NavLink to='dashboard'>Dashboard</NavLink>
                <NavLink to='schedule'>Schedule</NavLink>
                <NavLink to='dashboard'>Settings</NavLink>
            </div>

        </header>
    )
}
