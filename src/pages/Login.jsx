import React from 'react'
import {Form, NavLink, redirect} from 'react-router-dom'
import "./Login.css"
import { userLogin } from '../../api';
import { UserLoginContext } from '../UserContext.js';

export async function action({request}){
    const formData = await request.formData();

    const creds = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    
    const result = await userLogin(creds);

    console.log(result.message);

    if(result.success)
        return redirect("/user");
    else
        return null;
}

export default function Login(){

    return (
        <main className='mp-0 login-container'>
            <h1 className='login-logo mp-0'>Rolo</h1>
            <div className='flex flex-column ja-center login-input-container'>
                <div>
                    <h3 className='mp-0'>Log in to Rolo</h3>
                    <Form method='post' className='flex flex-column'>
                        <input type='email' id='email' name='email'/>
                        <input type='password' id='password' name='password'/>
                        <button type='submit'>Log in to Rolo</button>
                    </Form>
                    <p>
                        Don't have an account?
                        <NavLink to='/'>
                            Sign Up
                        </NavLink>
                    </p>
                </div>
            </div>
        </main>
    )
}