import React, { Component } from 'react'


 class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            cpassword: ""
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    onClick = async (e) => {
        e.preventDefault()
        console.log(this.state.name + " : " + this.state.password + " : " + this.state.email )
        const name = this.state.name
        const email = this.state.email
        const password = this.state.password
        const cpassword = this.state.cpassword

        const res = await fetch("/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,password,cpassword
            })
        })

        const data = await res.json()
        // Pending getting error codes back

        window.alert('Registration succesful!!!')
    }


    render(){
        return (
            <div id='loginform'>
                <h2 id="headerTitle">Register</h2>
                <form method='POST'>
                    <div className="row">
                        <input type="text" name="name" id="name" placeholder='Your name' value={this.state.name} onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <input type="email" name="email" id="email" placeholder='Your email ID' value={this.state.email} onChange={this.onChange} />
                    </div>
                    <div className="row">
                        <input type="password" name="password" id="password" placeholder='Your password' value={this.state.password} onChange={this.onChange}/>
                    </div>
                    <div className="row">
                        <input type="password" name="cpassword" id="cpassword" placeholder='Confirm your password' value={this.state.cpassword} onChange={this.onChange}/>
                    </div>
                    <div id="button" className='row'>
                        <input type="submit" name="signup" value="Register" onClick={this.onClick}/>
                    </div>
                </form>
                
            </div>
     
    )}
 }

export default Signup