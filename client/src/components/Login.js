import React, { Component, useState } from 'react'
import { useNavigate } from 'react-router-dom'


 const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch("/signin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,password
            })
        })

        const data = await res.json()
        // Pending getting error codes back

        if(res.status == 400){
            window.alert('Invalid Credentials')
        } else {
            window.alert('Login succesful!!!')
            navigate('/home')
        }
    }

    return (   
        <div id='loginform'>
            <h2 id="headerTitle">Login</h2>
            <form method='POST' action="" onSubmit={onSubmit}>
                <div className="row">
                    <input type="email" name="email" id="email" value={email} placeholder='Your email ID' 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="row">
                    <input type="password" name="password" id="password" value ={password} placeholder='Your password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div id="button" className='row'>
                    <input type="submit" name="Login" value="Login"/>
                </div>
            </form>
            
        </div>     
    )
}



export default Login