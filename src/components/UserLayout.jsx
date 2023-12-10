import React from 'react'
import {Outlet} from 'react-router-dom'

import UserHeader from './UserHeader'

export default function UserLayout(){
    return(
        <div className='flex'>
            <UserHeader/>
            <Outlet/>
        </div>
    )
}