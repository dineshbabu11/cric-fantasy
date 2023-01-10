import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'




const Home = () => {

  const [userData, setUserData] = useState(0)

  const navigate = useNavigate()
  const callHome = async () => {
    try{
      console.log('In callHome')
      const res = await fetch('/dashboard', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        credentials: 'include'
      })

      console.log("Back to Home")

      const data = await res.json()
      console.log(data)
      setUserData(data)

    } catch(error) {
      console.log(error)
      navigate('/')
    }
  }

  useEffect(() => {
    callHome()
  }, [])

  

  return(
    
    <div>
      <h1>{userData.name}</h1>
      <h1>{userData.email}</h1>
    </div>
    // <div>
    //   <h1> Welcome to Home page !!!! </h1>

    // </div>
  )
}

export default Home