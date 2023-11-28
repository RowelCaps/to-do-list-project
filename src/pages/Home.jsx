import React from 'react'
import {Link} from 'react-router-dom'
import "./home.css"

export default function Home(){
    return(
        <div className='full-page home mp-0'>
            <img src='home-bg.jpg' className='home-bg mp-0'/>
            <h1 className='text-center mp-0'>Simplicity meets Productivity</h1>
            <p className='text-center'>Dive into a clutter-free to-do list experience with Rolo </p>
            <Link className='primary-button get-stared-btn text-center' to='login'>Get Started</Link>
        </div>
    )
}