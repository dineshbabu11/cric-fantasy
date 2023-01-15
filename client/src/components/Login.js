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
        if(data){
            navigate('/home')
        }
        window.alert('Login succesful!!!')
    }

    return (   
        <div>
            <form method='POST' action="" onSubmit={onSubmit}>
                <div>
                    <input type="email" name="email" id="email" value={email} placeholder='Your email ID' 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input type="password" name="password" id="password" value ={password} placeholder='Your password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" name="Login" value="Login"/>
                </div>
            </form>
            
        </div>     
    )
}



export default Login