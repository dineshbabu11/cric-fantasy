import React, {useState, useEffect} from 'react'
import '../App.css'

const Leaderboard = () => {
    const [userData, setUserData] = useState([0])


    const fetchData = async () => {
        let displayList = []
        let display = {}
        let points

        try{

            const res = await fetch('/leaderboard', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
              },
              credentials: 'include'
            })
      
            const users = await res.json()

            users.map((user) => {
                points = 0
                user.matches.map((match) => {
                    points = points + match['points']

                })
                
                displayList = displayList.concat({name: user.name, points: points})

            })

            displayList.sort((point1, point2) => {
                return point2.points - point1.points
              })
            
            setUserData(displayList)

        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
      }, [userData])


    return(
        <div className="App">
    <h1>Points Table</h1>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((value, key)=> {
          return (
            <tr key={key}>
              <td>{value.name}</td>
              <td>{value.points}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    {userData.length == 0 && <h1>First match complete ayyaka chudara rey results</h1>}
  </div>
        
    )
}

export default Leaderboard