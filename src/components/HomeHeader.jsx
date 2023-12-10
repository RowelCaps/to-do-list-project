import React from 'react';
import {Link} from 'react-router-dom';
import "./home-header.css";

export default function HomeHeader(){
    return(
        <header className='header-top'>
            <h2 className='header-logo mp-0'>Rolo</h2>
            <Link className='primary-button login-btn' to='user'>LOGIN</Link>
        </header>
    )
}